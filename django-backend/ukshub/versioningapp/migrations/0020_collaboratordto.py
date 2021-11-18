# Generated by Django 3.2.9 on 2021-11-14 11:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('versioningapp', '0019_alter_collaboration_repository'),
    ]

    operations = [
        migrations.CreateModel(
            name='CollaboratorDto',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('collaboration_id', models.IntegerField()),
                ('username', models.CharField(max_length=200)),
                ('role', models.CharField(max_length=200)),
            ],
        ),
    ]
