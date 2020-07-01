from django.urls import path
from .import views

urlpatterns = [
    path('',views.home, name='home'),
    path('contact',views.contact, name='contact'),
    path('contact.html',views.contact, name='contact'),
    path('index.html', views.home,name='home'),
    path('userinput', views.userinput, name='userinput'),
    path('about.html', views.about,name='about'),
    path('portfolio.html', views.portfolio, name='portfolio'),
    path('blog.html', views.blog, name='blog'),
    path('map.html', views.map, name='map'),
    path('index1.html', views.index1, name = 'index1')
]