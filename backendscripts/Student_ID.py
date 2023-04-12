# Import packages
import cv2
import numpy as np
def Student_id():
    img = cv2.imread('downloaded_images\scantron-page0.jpg')
    print(img.shape) # Print image shape
    cv2.imshow("original", img)
    
    # Cropping an image
    cropped_image = img[1275:1815, 1000:1520]
    
    # Display cropped image
    cv2.imshow("cropped", cropped_image)
    
    # Save the cropped image
    cv2.imwrite("Student Id.jpg", cropped_image)
    
   # cv2.waitKey(0)
   # cv2.destroyAllWindows()
Student_id()