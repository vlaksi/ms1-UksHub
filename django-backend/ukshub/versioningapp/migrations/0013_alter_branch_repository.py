# Generated by Django 3.2.9 on 2021-11-11 19:20

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('versioningapp', '0012_auto_20211111_1835'),
    ]

    operations = [
        migrations.AlterField(
            model_name='branch',
            name='repository',
            field=models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, related_name='classTeacherOf', to='versioningapp.repository'),
        ),
    ]
