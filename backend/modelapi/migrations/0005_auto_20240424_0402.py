# Generated by Django 3.2.12 on 2024-04-24 04:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('modelapi', '0004_processedimage_uploaded_at'),
    ]

    operations = [
        migrations.AlterField(
            model_name='processedimage',
            name='cup_area',
            field=models.CharField(max_length=50),
        ),
        migrations.AlterField(
            model_name='processedimage',
            name='cupdisc_ratio',
            field=models.CharField(max_length=50),
        ),
        migrations.AlterField(
            model_name='processedimage',
            name='disc_area',
            field=models.CharField(max_length=50),
        ),
    ]
