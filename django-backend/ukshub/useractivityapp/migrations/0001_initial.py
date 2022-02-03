# Generated by Django 3.2.9 on 2022-02-03 16:45

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('progresstrackapp', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='ActionType',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('message', models.CharField(max_length=200)),
                ('creation_date', models.DateTimeField(verbose_name='date of creation')),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='comment_created', to=settings.AUTH_USER_MODEL)),
                ('issue', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='progresstrackapp.issue')),
                ('pull_request', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='progresstrackapp.pullrequest')),
            ],
        ),
        migrations.CreateModel(
            name='ReactionType',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='Reaction',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.CharField(max_length=200)),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='reactions_created', to=settings.AUTH_USER_MODEL)),
                ('comment', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='useractivityapp.comment')),
            ],
        ),
        migrations.CreateModel(
            name='Action',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('action_type', models.CharField(max_length=200)),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
