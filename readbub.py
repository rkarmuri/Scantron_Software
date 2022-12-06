from imutils import contours
from pdf2image import convert_from_path
from matplotlib import pyplot as plt
import imutils
import numpy as np
import cv2

image = cv2.imread('img3.jpg')
image = cv2.resize(image,(1876,2456))
y=226
x=150
h=500
w=240

answer=[1,2,3,4,3,2,1,5,1]

# Reading bubbled answers
img = image[y:y+h, x:x+w]
# Convert the image to grayscale
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
# Apply the threshold OTSU
thresh = cv2.threshold(gray,0,255,cv2.THRESH_BINARY_INV+cv2.THRESH_OTSU)[1]

# Find the contours of the image
cnts = cv2.findContours(thresh, cv2.RETR_EXTERNAL,cv2.CHAIN_APPROX_SIMPLE)
cnts = imutils.grab_contours(cnts)
questionCnts = []

for c in cnts:
    (x, y, w, h) = cv2.boundingRect(c)
    ar = w/float(h)
    #print(f'{w,h}')
    #print(f'{ar}')
    if w>=30 and h>=20 and ar >= 1.2 and ar <= 1.8:
        questionCnts.append(c)


questionCnts = contours.sort_contours(questionCnts,method="top-to-bottom")[0]

correct = 0

'''for (j, c) in enumerate(cnts):
    mask = np.zeros(thresh.shape, dtype="uint8")
    cv2.drawContours(mask, [c], -1, 255, -1)
    mask = cv2.bitwise_and(thresh, thresh, mask=mask)
    cv2.imshow(f"{j}", mask)'''
        
for (q, i) in enumerate(np.arange(0, len(questionCnts), 5)):
    cnts = contours.sort_contours(questionCnts[i:i + 5])[0]
    bubbled = None
    for (j, c) in enumerate(cnts):
		# construct a mask that reveals only the current
		# "bubble" for the question
        mask = np.zeros(thresh.shape, dtype="uint8")
        cv2.drawContours(mask, [c], -1, 255, -1)
		# apply the mask to the thresholded image, then
		# count the number of non-zero pixels in the
		# bubble area
        mask = cv2.bitwise_and(thresh, thresh, mask=mask)
        cv2.imshow(f"{j}", mask)
        total = cv2.countNonZero(mask)
		# if the current total has a larger number of total
		# non-zero pixels, then we are examining the currently
		# bubbled-in answer
        if bubbled is None or total > bubbled[0]:
            bubbled = (total, j)
        k = answer[q]
        if k == bubbled[1]:
            correct += 1

# Reading the studentIDs
y1=1067
x1=720
h1=320
w1=400

studentID=[0,1,2,3,4,5,6,7,8,9]

# Reading bubbled answers
img1 = image[y1:y1+h1, x1:x1+w1]
# Convert the image to grayscale
gray1 = cv2.cvtColor(img1, cv2.COLOR_BGR2GRAY)
# Apply the threshold OTSU
thresh1 = cv2.threshold(gray1,0,255,cv2.THRESH_BINARY_INV+cv2.THRESH_OTSU)[1]

# Find the contours of the image
conts = cv2.findContours(thresh1, cv2.RETR_EXTERNAL,cv2.CHAIN_APPROX_SIMPLE)
conts = imutils.grab_contours(conts)
studentCnts = []

for c in conts:
    (x, y, w, h) = cv2.boundingRect(c)
    ar = w/float(h)
    #print(f'{w,h}')
    #print(f'{ar}')
    if w>=30 and h>=20 and ar >= 1.2 and ar <= 1.8:
        studentCnts.append(c)

print("Student score: ",correct)
'''for (j, c) in enumerate(conts):
    mask = np.zeros(thresh1.shape, dtype="uint8")
    cv2.drawContours(mask, [c], -1, 255, -1)
    mask = cv2.bitwise_and(thresh1, thresh1, mask=mask)
    cv2.imshow(f"{j}", mask)'''

ID=[]
for (q, i) in enumerate(np.arange(0, len(studentCnts), 10)):
    conts = contours.sort_contours(studentCnts[i:i + 10])[0]
    bubbled = None
    for (j, c) in enumerate(conts):
		# construct a mask that reveals only the current
		# "bubble" for the question
        mask = np.zeros(thresh1.shape, dtype="uint8")
        cv2.drawContours(mask, [c], -1, 255, -1)
		# apply the mask to the thresholded image, then
		# count the number of non-zero pixels in the
		# bubble area
        mask = cv2.bitwise_and(thresh1, thresh1, mask=mask)
        #cv2.imshow(f"{j}", mask)
        total = cv2.countNonZero(mask)
		# if the current total has a larger number of total
		# non-zero pixels, then we are examining the currently
		# bubbled-in answer
        if bubbled is None or total > bubbled[0]:
            bubbled = (total, j)
        k = studentID[q]
        if k == bubbled[1]:
            ID.append(k)

print("Student id is:", ID)
#cv2.imshow('output image',thresh1)
cv2.waitKey(0) 
cv2.destroyAllWindows()