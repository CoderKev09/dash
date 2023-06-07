from django.urls import path
from .views import (
    api_list_technicians,
    api_show_technicians,
    api_list_automobiles,
    api_list_appointments,
    api_show_appointments,
    api_service_history,
)

urlpatterns = [
    path("technicians/", api_list_technicians, name="api_list_technicians"),
    path("technicians/<int:pk>/", api_show_technicians, name="api_show_technicians"),
    path("automobiles/", api_list_automobiles, name="api_list_automobiles"),
    path("appointments/", api_list_appointments, name="api_list_appointments"),
    path("appointments/<int:pk>/", api_show_appointments, name="api_show_appointments"),
    path("appointments/<int:pk>/cancel/", api_show_appointments, name="api_show_appointments"),
    path("appointments/<int:pk>/finish/", api_show_appointments, name="api_show_appointments"),
    path("service-history/", api_service_history, name="api_service_history"),
]
