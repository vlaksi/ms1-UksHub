# Generated by Django 3.2.9 on 2021-11-11 19:27

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('versioningapp', '0013_alter_branch_repository'),
    ]

    operations = [
        migrations.RenameField(
            model_name='branch',
            old_name='repository',
            new_name='repository_aaaaaaaaaa',
        ),
    ]
