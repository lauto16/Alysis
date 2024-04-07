from django.shortcuts import render
from django.http import JsonResponse
import json

def index_view(request):

    if request.method == 'POST':
        received = json.loads(request.body)
        action = received['action']

        if action == 'new_data_set':
            print(received['data'])

            # create a class on utils, this class should contain data validations and return a dict to send
            # through JsonResponse

            response_data = {
                'success': True
            }

            return JsonResponse(response_data)

    return render(request, 'index.html')
