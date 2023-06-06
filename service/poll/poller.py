import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "service_project.settings")
django.setup()

from service_rest.models import AutomobileVO


def poll(repeat=True):
    while True:
        print("Service poller polling for data")
        try:
            url = "http://inventory-api:8000/api/automobiles/"
            response = requests.get(url)
            content = json.loads(response.content)
            for auto in content["autos"]:
                AutomobileVO.objects.update_or_create(
                    import_href=auto["href"],
                    defaults={
                        "vin": auto["vin"],
                        "sold": auto["sold"],
                        "year": auto["year"],
                        "color": auto["color"],
                        "model": auto["model"],
                    },
                )

        except Exception as e:
            print(e, file=sys.stderr)

        if not repeat:
            break

        time.sleep(60)


if __name__ == "__main__":
    poll()
