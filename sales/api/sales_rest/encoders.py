from common.json import ModelEncoder
from .models import Salesperson, Sale, Customer, AutomobileVO

class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ["vin", "sold"]


class SalespersonEncoder(ModelEncoder):
    model = Salesperson
    properties = [
        "first_name",
        "last_name",
        "employee_id",
        "id"
    ]

class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = [
        "first_name",
        "last_name",
        "address",
        "phone_number",
        "id",
    ]

class SaleEncoder(ModelEncoder):
    model = Sale
    properties = [
        "automobile",
        "price",
        "salesperson",
        "customer",
        "id"

    ]
    encoders={
        "automobile":AutomobileVOEncoder(),
        "salesperson":SalespersonEncoder(),
        "customer":CustomerEncoder()
    }
