from django.shortcuts import render
from django.http import HttpResponse
from .models import Comments, Email_list
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import smtplib, time, datetime
from email.message import EmailMessage

# Create your views here.

def index1(request):
    return render(request,'index2.html')

#Function to display the home page
def home(request):
    return render(request,'index.html')

#Function to display the contact page
def contact(request):
    return render(request,'contact.html')

#Function to display about page
def about(request):
    return render(request,'about.html')

#Function to display Portfolio
def portfolio(request):
    return render(request,'portfolio.html')

#Function to display blog
def blog(request):
    return render(request,'blog.html')

#Function to display map page
def map(request):
    return render(request,'map.html')

#Function to receive user input from contact page and to send an email to the page admin
def userinput(request):
    user_input = Comments()
    name = request.POST['name']
    mail = request.POST['mail']
    subject = request.POST['subject']
    comment = request.POST['comment']
    

    user_input.name = name
    user_input.email = mail
    user_input.subject = subject
    user_input.comment = comment
    user_input.save()

    

    "=============== Code to send email to the admin =================== "


    
    body = 'A new message has been received \n \n  Following are the details \n'
    c_time = datetime.datetime.now()
    n_time = "Last updated on " + str(c_time.hour) + ":" + str(c_time.minute)
    body += 'User: ' + name + '\n \n' + 'Email: '+ mail + '\n \n' 'Subject: ' + subject + '\n \n' + 'Comment: ' + comment + '\n \n' + n_time
    Emails = Email_list.objects.all()
    for i in Emails:
        msg = EmailMessage()
        msg['From'] = '"Kha-Squared" <khas39628@gmail.com>'
        msg['To'] = i.email
        msg['Subject'] = 'A new message has been posted (automated email)'
        msg.set_content(body)
        smtplibObj = smtplib.SMTP('smtp.gmail.com',587)
        smtplibObj.ehlo()
        smtplibObj.starttls()
        smtplibObj.login("khas39628@gmail.com", "ksquared@123")
        #smtplibObj.sendmail('khas39628@gmail.com',i.email, msg)
        smtplibObj.send_message(msg)
        smtplibObj.quit()
        print('Email has been send')        

    return render(request,'contact1.html',{'name':name})
