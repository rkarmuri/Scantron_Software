from keras.models import load_model
from imutils import contours
from PIL import Image as im
from matplotlib import pyplot as plt
import imutils
import numpy as np
import cv2

model = load_model('mnist.h5')

def predict_digit(img):
    img = cv2.resize(img,(28,28))
    img = cv2.bitwise_not(img)
    #img = cv2.cvtColor(img,cv2.COLOR_BGR2GRAY)
    img = np.array(img)
    cv2.imshow('digit',img)
    #reshaping for model normalization
    img = img.reshape(1,28,28,1)
    img = img.astype('float32')
    img = img/255
    #predicting the class
    res = model.predict([img])[0]
    return np.argmax(res)
image = cv2.imread('img2.jpg')
y=1000
x=750
h=60
w=380
# Extract the StudentID location on the Scantron sheet
get_id = image[y:y+h, x:x+w]
#img = cv2.resize(get_id,(450,80))
img = cv2.rotate(get_id, cv2.ROTATE_90_CLOCKWISE)

# Convert the image to grayscale
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
# Apply the threshold OTSU 
thresh = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)[1]

# Remove horizontal boxed lines from the image
horizontal_kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (25,1))
detected_lines = cv2.morphologyEx(thresh, cv2.MORPH_OPEN, horizontal_kernel, iterations=2)

# Use the thresholded image as the contours accept only white with black background images
cnts = cv2.findContours(detected_lines, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
cnts = cnts[0] if len(cnts) == 2 else cnts[1]
for c in cnts:
    cv2.drawContours(img, [c], -1, (255,255,255), 2)

# Repair image
repair_kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (1,4))
result = 255 - cv2.morphologyEx(255 - img, cv2.MORPH_CLOSE, repair_kernel, iterations=2)
final_img = cv2.rotate(result,cv2.ROTATE_90_COUNTERCLOCKWISE)

# Apply contours for the numbers
gray2 = cv2.cvtColor(final_img, cv2.COLOR_BGR2GRAY)
thresh2 = cv2.threshold(gray2, 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)[1]
contours = cv2.findContours(thresh2, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
contours = contours[0] if len(contours) == 2 else contours[1]
detected_digits=[]
for c in contours:
    x,y,w,h = cv2.boundingRect(c)
    cv2.rectangle(final_img, (x-4,y-4), (x+w+5, y+h+5), color=(0, 255, 0), thickness=1)
    digit = thresh2[y:y+h, x:x+w]
    if digit.shape[1]<=10:
        r = 10.0 / digit.shape[1]
        dim = (10, int(digit.shape[0] * r))
        # perform the actual resizing of the digit
        digit = cv2.resize(digit, dim, interpolation=cv2.INTER_AREA)
    elif digit.shape[0]<=15:
        r = 20.0 / digit.shape[0]
        dim = (20, int(digit.shape[1] * r))
        # perform the actual resizing of the digit
        digit = cv2.resize(digit, dim, interpolation=cv2.INTER_AREA)
    if digit.shape[0]>10 and digit.shape[1]<50:
        print(digit.shape)
        #cv2.imshow('digit',digit)
        digits=predict_digit(digit)
        detected_digits.append(digits)

print(detected_digits)
cv2.imshow('output image',final_img)
cv2.waitKey(0) 
cv2.destroyAllWindows()
