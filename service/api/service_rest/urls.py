from django.urls import path
from .views import (
    api_list_technicians,
    api_show_technicians,
    api_list_appointments,
    api_show_appointments,
)

urlpatterns = [
    path("technicians/", api_list_technicians, name="api_list_technicians"),
    path("technicians/<int:pk>/", api_show_technicians, name="api_show_technicians"),
    path("appointments/", api_list_appointments, name="api_list_appointments"),
    path("appointments/<int:pk>/", api_show_appointments, name="api_show_appointments"),
    path("appointments/<int:pk>/cancel/", api_show_appointments, name="api_show_appointments"),
    path("appointments/<int:pk>/finish/", api_show_appointments, name="api_show_appointments"),
]
