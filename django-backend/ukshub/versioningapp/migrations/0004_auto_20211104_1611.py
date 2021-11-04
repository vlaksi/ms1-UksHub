# Generated by Django 3.2.9 on 2021-11-04 15:11

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('versioningapp', '0003_auto_20211103_2232'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='branch',
            name='repository',
        ),
        migrations.AddField(
            model_name='branch',
            name='child_branchs',
            field=models.ManyToManyField(related_name='_versioningapp_branch_child_branchs_+', to='versioningapp.Branch'),
        ),
        migrations.AddField(
            model_name='branch',
            name='commits',
            field=models.ManyToManyField(to='versioningapp.Commit'),
        ),
        migrations.AddField(
            model_name='branch',
            name='files',
            field=models.ManyToManyField(to='versioningapp.File'),
        ),
        migrations.AddField(
            model_name='branch',
            name='folders',
            field=models.ManyToManyField(to='versioningapp.Folder'),
        ),
        migrations.AddField(
            model_name='branch',
            name='parent_branch',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='versioningapp.branch'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='commit',
            name='files',
            field=models.ManyToManyField(to='versioningapp.File'),
        ),
        migrations.AddField(
            model_name='folder',
            name='files',
            field=models.ManyToManyField(to='versioningapp.File'),
        ),
        migrations.AddField(
            model_name='folder',
            name='last_change',
            field=models.DateTimeField(default=django.utils.timezone.now, verbose_name='last change'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='folder',
            name='parent_directory',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='parent_folder', to='versioningapp.folder'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='folder',
            name='sub_directories',
            field=models.ManyToManyField(related_name='_versioningapp_folder_sub_directories_+', to='versioningapp.Folder'),
        ),
        migrations.AddField(
            model_name='repository',
            name='branches',
            field=models.ManyToManyField(to='versioningapp.Branch'),
        ),
    ]
