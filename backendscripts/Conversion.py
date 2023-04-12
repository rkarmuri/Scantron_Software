import os
import shutil

from pdf2image import convert_from_path

def conversion():

    pdf_dir = rf'{os.getcwd()}'
    #print(os.path.exists(pdf_dir))

    if os.path.exists(pdf_dir +'/downloaded_images'):
        shutil.rmtree(pdf_dir+'/downloaded_images')
    else:
        print("The system cannot find the file specified")

    for pdf_file in os.listdir(pdf_dir):

        if pdf_file.endswith(".pdf"):

            pages = convert_from_path(pdf_file, 300, poppler_path=r'C:\poppler-0.68.0\bin')
            pdf_file = pdf_file[:-4]

            for page in pages: 
                
                page.save("%s-page%d.jpg" % (pdf_file,pages.index(page)), "JPEG")


    images = [f for f in os.listdir() if '.jpg' in f.lower()]

    os.mkdir('downloaded_images')

    for image in images:
        new_path = 'downloaded_images/' + image
        shutil.move(image, new_path)

conversion()