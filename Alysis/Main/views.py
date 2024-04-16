import json
from django.shortcuts import render
from django.http import JsonResponse

def index_view(request):
    if request.method == 'POST':
        data = request.POST
        action = data['request']

        if action == 'new-data-set':
            print(data)

    return render(request, 'index.html')