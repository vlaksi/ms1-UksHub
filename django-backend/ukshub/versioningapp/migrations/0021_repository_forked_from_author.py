# Generated by Django 3.2.9 on 2021-11-24 19:13

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('versioningapp', '0020_collaboratordto'),
    ]

    operations = [
        migrations.AddField(
            model_name='repository',
            name='forked_from_author',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='authorRepositoryForkedFrom', to=settings.AUTH_USER_MODEL),
        ),
    ]
