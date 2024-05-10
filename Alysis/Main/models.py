from django.db import models


class DataSetDB(models.Model):
    name = models.CharField(max_length=100)
    csv_file_name = models.CharField(max_length=100)
