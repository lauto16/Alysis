import json
from .data_set_utils import DataSet
from django.shortcuts import render
from django.http import JsonResponse

def index_view(request):
    if request.method == 'POST':
        data = request.POST
        action = data['request']

        if action == 'new-data-set':
            data_set = DataSet(name=data['new-set-name'], values=data, owner=['lauty'])
            print(data_set)

    return render(request, 'index.html')