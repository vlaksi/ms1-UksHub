import json

from django.test import TestCase, Client
from django.urls import reverse
from django.http import Http404
from ..models import ActionType, ReactionType, Action, Reaction, Comment
from versioningapp.models import Repository
from progresstrackapp.models import Issue

from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
User = get_user_model()

from .test_models import initialize_db_with_test_data,USER1_USERNAME,USER2_USERNAME,USER1_PASSWORD,USER2_PASSWORD,USER2_EMAIL,USER2_FIRST_NAME,USER2_LAST_NAME,REPO1_NAME,COMMENT_MESSAGE_1,REACTION_TYPE_NAME

from rest_framework.test import APIClient



JSON = 'application/json'

def get_jwt_token(is_admin):
    c = Client()
    if (is_admin):
        response = c.post('/auth/jwt/create/', {'username': USER1_USERNAME, 'password': USER1_PASSWORD})
    else:
        response =c.post('/auth/jwt/create/', {'username': USER2_USERNAME, 'password': USER2_PASSWORD})
    return json.loads(response.content.decode('UTF-8'))['access']

def get_mocked_user(username, password, first_name, last_name, email):
    user = {
        "username": username, 
        "password": password,
        "first_name": first_name,
        "last_name": last_name,
        "email": email
    }
    return user

def get_mocked_comment(test_comment_message='Some_Comment_Test'):
    user_id = User.objects.get(username=USER1_USERNAME).pk

    comment = {
       "message":test_comment_message,
       "creation_date":"2022-01-31 10:53:15.739+01",
       "author":user_id
    }
    return comment

def get_mocked_reactions(test_type_reaction='Some_Reaction_Type'):
    user_id = User.objects.get(username=USER1_USERNAME).pk
    comment_id = Comment.objects.get(message=COMMENT_MESSAGE_1).pk

    reaction = {
       "type":test_type_reaction,
       "comment":comment_id,
       "author":user_id
    }
    return reaction

def get_action(index=0):
    return Action.objects.all()[index]

def get_repository(index=0):
    return Repository.objects.all()[index]

def get_comment(index=0):
    return Comment.objects.all()[index]

def get_comment_id(commentReaction_id=0):
    if commentReaction_id != -1:
        comment_id = Comment.objects.all()[commentReaction_id].id
    else: # return comment_id that for sure does not exist
        comments = Comment.objects.all()
        comment_id = comments[len(comments) - 1].id + 999
    return comment_id

def get_issue_id(issueComment_id=0):
    if issueComment_id != -1:
        issue_id = Issue.objects.all()[issueComment_id].id
    else: # return issue_id that for sure does not exist
        issues = Issue.objects.all()
        issue_id = issues[len(issues) - 1].id + 999
    return issue_id

class TestUserAdminListView(TestCase):

    @classmethod
    def setUpTestData(cls):
        initialize_db_with_test_data()

    def setUp(self) -> None:
        self.c = Client()
        self.token = f'JWT {get_jwt_token(True)}'
        self.unauthorisedТoken = f'JWT {get_jwt_token(False)}'

    def test_get_all_users(self):
        response = self.c.get('/useractivity/manageusers/', HTTP_AUTHORIZATION=self.token, content_type=JSON)
        res_obj = json.loads(response.content.decode('UTF-8'))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(res_obj),3)
    
    def test_get_HTTP403_all_users(self):
        response = self.c.get('/useractivity/manageusers/', HTTP_AUTHORIZATION=self.unauthorisedТoken, content_type=JSON)
        self.assertEqual(response.status_code, 403)

    def test_get_user_by_id(self):
        user = User.objects.get(username=USER2_USERNAME)
        response = self.c.get('/useractivity/manageusers/'+str(user.pk), HTTP_AUTHORIZATION=self.token, content_type=JSON)
        res_obj = json.loads(response.content.decode('UTF-8'))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(res_obj['username'], USER2_USERNAME)
        self.assertEqual(res_obj['email'], USER2_EMAIL)
        self.assertEqual(res_obj['first_name'], USER2_FIRST_NAME)
        self.assertEqual(res_obj['last_name'], USER2_LAST_NAME)

    def test_get_HTTP404_user_by_non_existent_id(self):
        response = self.c.get('/useractivity/manageusers/9999', HTTP_AUTHORIZATION=self.token, content_type=JSON)
        self.assertEqual(response.status_code, 404)

    def test_post_user_successfully(self):
        test_user_username = 'test_user'
        test_user_email = 'testuser@gmail.com'
        test_user_password = 'U63rT3st'
        test_user_first_name = 'Petar'
        test_user_last_name = 'Petrovic'
        user = get_mocked_user(test_user_username, test_user_password, test_user_first_name, test_user_last_name, test_user_email)
  
        response = self.c.post(
            '/useractivity/manageusers/',
            data=json.dumps(user),
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON
        )
        res_obj = json.loads(response.content.decode('UTF-8'))

        self.assertEquals(response.status_code, 201)
        self.assertEquals(res_obj['username'], test_user_username)
        self.assertEquals(res_obj['first_name'], test_user_first_name)
        self.assertEquals(res_obj['last_name'], test_user_last_name)
        self.assertEquals(res_obj['email'], test_user_email)

    def test_put_user_change_data(self):
        u = User.objects.get(username=USER2_USERNAME)
        new_user_username = 'New_User_Username'
        new_user_email = 'New_User_Email@gmail.com'
        new_user_password = 'U63rT3st2'
        new_user_first_name = 'Uros'
        new_user_last_name = 'Urosevic'
        user = get_mocked_user(new_user_username, new_user_password, new_user_first_name, new_user_last_name, new_user_email)
  
        response = self.c.put(
            '/useractivity/manageusers/'+str(u.pk),
            data=json.dumps(user),
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON
        )
        res_obj = json.loads(response.content.decode('UTF-8'))

        self.assertEquals(response.status_code, 200)
        self.assertNotEqual(res_obj['username'], u.username)
        self.assertEqual(res_obj['username'], new_user_username)
        self.assertNotEqual(res_obj['email'], u.email)
        self.assertEqual(res_obj['email'], new_user_email)
        self.assertNotEqual(res_obj['first_name'], u.first_name)
        self.assertEqual(res_obj['first_name'], new_user_first_name)
        self.assertNotEqual(res_obj['last_name'], u.last_name)
        self.assertEqual(res_obj['last_name'], new_user_last_name)

    def test_put_HTTP404_user_change_data(self):
        new_user_username = 'New_User_Username'
        new_user_email = 'New_User_Email@gmail.com'
        new_user_password = 'U63rT3st2'
        new_user_first_name = 'Uros'
        new_user_last_name = 'Urosevic'
        user = get_mocked_user(new_user_username, new_user_password, new_user_first_name, new_user_last_name, new_user_email)
  
        response = self.c.put(
            '/useractivity/manageusers/9999',
            data=json.dumps(user),
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON
        )
        res_obj = json.loads(response.content.decode('UTF-8'))

        self.assertEquals(response.status_code, 404)
        self.assertEquals(res_obj, {'detail': 'Not found.'})

    def test_delete_user(self):
        user = User.objects.get(username=USER2_USERNAME)

        response = self.c.delete(
            '/useractivity/manageusers/'+str(user.pk),
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON
        )

        self.assertEquals(response.status_code, 204)

    def test_delete_HTTP404_user(self):
        response = self.c.delete(
            '/useractivity/manageusers/99999',
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON
        )
        
        self.assertEquals(response.status_code, 404)

class TestActionListView(TestCase):
    
    @classmethod
    def setUpTestData(cls):
        initialize_db_with_test_data()

    def setUp(self) -> None:
        self.c = Client()
        self.token = f'JWT {get_jwt_token(True)}'
        self.unauthorisedТoken = f'JWT {get_jwt_token(False)}'

    def test_get_all_actions(self):
        response = self.c.get('/useractivity/actions/', HTTP_AUTHORIZATION=self.token, content_type=JSON)
        res_obj = json.loads(response.content.decode('UTF-8'))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(res_obj), 1)

    def test_get_HTTP404_all_actions(self):
        response = self.c.get('/useractiviry/actions', HTTP_AUTHORIZATION=self.token, content_type=JSON)
        self.assertEqual(response.status_code, 404)

    def test_post_action_successfully(self):
        user = User.objects.get(username=USER1_USERNAME)
        repository = Repository.objects.get(name=REPO1_NAME)

        action = {
            "author": user.pk,
            "repository": repository.pk,
            "action_type": "watch"
        }

        response = self.c.post(
            '/useractivity/actions/',
            data=json.dumps(action),
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON
        )
        res_obj = json.loads(response.content.decode('UTF-8'))

        self.assertEquals(response.status_code, 201)
        self.assertEquals(res_obj['author'], user.pk)
        self.assertEquals(res_obj['repository'], repository.pk)
        self.assertEquals(res_obj['action_type'], "watch")
        self.assertNotEquals(res_obj['action_type'], "fork")

    def test_HTTP_400_post_action(self):
        user = User.objects.get(username=USER1_USERNAME)
        repository = Repository.objects.get(name=REPO1_NAME)

        action = {
            "author": user.pk,
            "repository": 999,
            "action_type": "fork"
        }

        response = self.c.post(
            '/useractivity/actions/',
            data=json.dumps(action),
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON
        )
        res_obj = json.loads(response.content.decode('UTF-8'))

        self.assertEquals(response.status_code, 400)

    def test_get_all_action_types(self):
        response = self.c.get('/useractivity/actiontypes/', HTTP_AUTHORIZATION=self.token, content_type=JSON)
        res_obj = json.loads(response.content.decode('UTF-8'))
        self.assertEqual(response.status_code, 200)
    
    def test_get_HTTP_404_all_action_types(self):
        response = self.c.get('/useractivitrr/actiontypes', HTTP_AUTHORIZATION=self.token, content_type=JSON)
        self.assertEqual(response.status_code, 404)

    def test_post_action_type_successfully(self):

        action_type = {
            "name": "watch"
        }

        response = self.c.post(
            '/useractivity/actiontypes/',
            data=json.dumps(action_type),
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON
        )
        res_obj = json.loads(response.content.decode('UTF-8'))

        self.assertEquals(response.status_code, 201)
        self.assertEquals(res_obj['name'], "watch")

    def test_post_HTTP_400_action_type(self):

        action_type = {
            "ime": "watch"
        }

        response = self.c.post(
            '/useractivity/actiontypes/',
            data=json.dumps(action_type),
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON
        )

        self.assertEquals(response.status_code, 400)

class TestActionDetailView(TestCase):

    @classmethod
    def setUpTestData(cls):
        initialize_db_with_test_data()

    def setUp(self) -> None:
        self.c = Client()
        self.token = f'JWT {get_jwt_token(True)}'
        self.unauthorisedТoken = f'JWT {get_jwt_token(False)}'

    def test_get_actions_by_id_successfully(self):
        action = get_action()
        repository = get_repository()

        response = self.c.get(
            '/useractivity/actions/'+str(action.pk),
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON
        )
        res_obj = json.loads(response.content.decode('UTF-8'))

        self.assertEqual(response.status_code, 200)
        self.assertEqual(res_obj['repository'], repository.pk)

    def test_get_HTTP_404_actions_by_id(self):

        response = self.c.get(
            '/useractivity/actions/9999',
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON
        )

        self.assertEqual(response.status_code, 404)
    
    def test_put_action(self):
        old_action = get_action()
        user = User.objects.get(username=USER1_USERNAME)
        repository = Repository.objects.get(name=REPO1_NAME)

        action = {
            "author": user.pk,
            "repository": repository.pk,
            "action_type": "fork"
        }

        response = self.c.put(
            '/useractivity/actions/'+str(old_action.pk),
            data=json.dumps(action),
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON
        )
        res_obj = json.loads(response.content.decode('UTF-8'))

        self.assertEquals(response.status_code, 200)
        self.assertNotEquals(res_obj['action_type'], "watch")
        self.assertEquals(res_obj['action_type'], "fork")

    def test_put_HTTP_404_action(self):
        old_action = get_action()
        user = User.objects.get(username=USER1_USERNAME)
        repository = Repository.objects.get(name=REPO1_NAME)

        action = {
            "author": user.pk,
            "repository": repository.pk,
            "action_type": "fork"
        }

        response = self.c.put(
            '/useractivity/actions/9999',
            data=json.dumps(action),
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON
        )

        self.assertEquals(response.status_code, 404)

    def test_delete_action(self):
        old_action = get_action()

        response = self.c.delete(
            '/useractivity/actions/'+str(old_action.pk),
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON
        )

        self.assertEquals(response.status_code, 204)

    def test_delete_HTTP_404_action(self):
        old_action = get_action()

        response = self.c.delete(
            '/useractivity/actions/999',
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON
        )

        self.assertEquals(response.status_code, 404)

class TestCommentListView(TestCase):
    @classmethod
    def setUpTestData(cls):
        initialize_db_with_test_data()

    def setUp(self) -> None:
        self.c = Client()
        self.token = f'JWT {get_jwt_token(True)}'
        self.unauthorisedТoken = f'JWT {get_jwt_token(False)}'

    def test_get_all_comments(self):
        response = self.c.get('/useractivity/comments/', HTTP_AUTHORIZATION=self.token, content_type=JSON)
        res_obj = json.loads(response.content.decode('UTF-8'))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(res_obj),2)

    def test_get_all_comments_wrong_url(self):
        response = self.c.get('/useractivity/comment', HTTP_AUTHORIZATION=self.token, content_type=JSON)
        self.assertEqual(response.status_code, 404)

    def get_issue_comments(self, issueComment_id=0):
        issue_id = get_issue_id(issueComment_id)
        response = self.client.get(reverse('all-issue-comments', kwargs={'issue_id': issue_id}))
        return response, issue_id

    def test_get_all_issue_comments(self):
        response, _ = self.get_issue_comments()
        self.assertEqual(response.status_code, 200)

    def test_post_create_comment_successfully(self):
        comment = get_mocked_comment('Test comment message 1')

        response = self.c.post(
            '/useractivity/comments/',
            data=json.dumps(comment),
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON
        )
        res_obj = json.loads(response.content.decode('UTF-8'))
       
        self.assertEquals(response.status_code, 201)
        self.assertEquals(res_obj['message'], 'Test comment message 1')

    def test_post_create_comment_with_missing_message(self):
        test_message_comment = None
        comment = get_mocked_comment(test_message_comment)

        response = self.c.post(
            '/useractivity/comments/',
            data=json.dumps(comment),
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON
        )

        self.assertEquals(response.status_code, 400)

class TestCommentDetailView(TestCase):
    @classmethod
    def setUpTestData(cls):
        initialize_db_with_test_data()

    def setUp(self) -> None:
        self.c = Client()
        self.token = f'JWT {get_jwt_token(True)}'
        self.unauthorisedТoken = f'JWT {get_jwt_token(False)}'

    def test_get_HTTP404_comment_by_id(self):
        response = self.c.get(
            '/useractivity/comments/99999',
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON
        )
        self.assertEqual(response.status_code, 404)
    
    def test_get_comment_by_id_successfully(self):
        comment = Comment.objects.get(message='Komentar1')
        response = self.c.get(
            '/useractivity/comments/'+str(comment.pk),
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON
        )
        res_obj = json.loads(response.content.decode('UTF-8'))

        self.assertEqual(response.status_code, 200)
        self.assertEqual(res_obj['message'], 'Komentar1')

    def test_delete_comment(self):
        comment = Comment.objects.get(message='Komentar1')

        response = self.c.delete(
            '/useractivity/comments/'+str(comment.pk),
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON
        )

        self.assertEquals(response.status_code, 204)
    
    def test_delete_HTTP404_comment(self):
        comment = Comment.objects.get(message='Komentar1')

        response = self.c.delete(
            '/useractivity/comments/999',
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON
        )

        self.assertEquals(response.status_code, 404)

    def test_put_HTTP404_comment_change_message(self):
        comment = Comment.objects.get(message='Komentar2')
        new_comment_message = 'New_Comment_Message'
        new_comment = get_mocked_comment(new_comment_message)

        response = self.c.put(
            '/useractivity/comments/99999',
            data=json.dumps(new_comment),
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON
        )
        res_obj = json.loads(response.content.decode('UTF-8'))

        self.assertEquals(response.status_code, 404)
    
    def test_put_comment_change_message(self):
        comment = Comment.objects.get(message='Komentar2')
        new_comment_message = 'New_Comment_Message'
        new_comment = get_mocked_comment(new_comment_message)

        response = self.c.put(
             '/useractivity/comments/'+str(comment.pk),
            data=json.dumps(new_comment),
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON
        )
        res_obj = json.loads(response.content.decode('UTF-8'))

        self.assertEquals(response.status_code, 200)
        self.assertNotEqual(res_obj['message'], comment.message)
        self.assertEqual(res_obj['message'], new_comment_message)
    
class TestReactionListView(TestCase):
    @classmethod
    def setUpTestData(cls):
        initialize_db_with_test_data()

    def setUp(self) -> None:
        self.c = Client()
        self.token = f'JWT {get_jwt_token(True)}'
        self.unauthorisedТoken = f'JWT {get_jwt_token(False)}'

    def test_get_all_reactions(self):
        response = self.c.get('/useractivity/reactions/', HTTP_AUTHORIZATION=self.token, content_type=JSON)
        res_obj = json.loads(response.content.decode('UTF-8'))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(res_obj),2)
    
    def test_get_all_reactions_wrong_url(self):
        response = self.c.get('/useractivity/reaction', HTTP_AUTHORIZATION=self.token, content_type=JSON)
        self.assertEqual(response.status_code, 404)

    def test_get_all_reaction_types(self):
        response = self.c.get('/useractivity/reactiontypes/', HTTP_AUTHORIZATION=self.token, content_type=JSON)
        res_obj = json.loads(response.content.decode('UTF-8'))
        self.assertEqual(response.status_code, 200)
    
    def test_get_HTTP_404_all_reaction_types(self):
        response = self.c.get('/useractivity/reactiontype', HTTP_AUTHORIZATION=self.token, content_type=JSON)
        self.assertEqual(response.status_code, 404)

    def get_comment_reactions(self, commentReaction_id=0):
        comment_id = get_comment_id(commentReaction_id)
        response = self.client.get(reverse('all-comment-reactions', kwargs={'comment_id': comment_id}))
        return response, comment_id

    def test_get_all_comment_reactions(self):
        response, _ = self.get_comment_reactions()
        self.assertEqual(response.status_code, 200)

    def test_get_HTTP404_if_reaction_does_not_exist(self):
        response, _ = self.get_comment_reactions(-1)
        self.assertEqual(response.status_code, 404)

    def test_post_create_reaction_successfully(self):
        reaction = get_mocked_reactions('Test reaction')

        response = self.c.post(
            '/useractivity/reactions/',
            data=json.dumps(reaction),
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON
        )
        res_obj = json.loads(response.content.decode('UTF-8'))
       
        self.assertEquals(response.status_code, 201)
        self.assertEquals(res_obj['type'], 'Test reaction')

    def test_post_create_reaction_with_missing_type(self):
        test_reaction_type = None
        reaction = get_mocked_reactions(test_reaction_type)

        response = self.c.post(
            '/useractivity/reactions/',
            data=json.dumps(reaction),
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON
        )

        self.assertEquals(response.status_code, 400)
    
class TestReactionDetailView(TestCase):
    @classmethod
    def setUpTestData(cls):
        initialize_db_with_test_data()

    def setUp(self) -> None:
        self.c = Client()
        self.token = f'JWT {get_jwt_token(True)}'
        self.unauthorisedТoken = f'JWT {get_jwt_token(False)}'

    def test_get_HTTP404_reaction_by_id(self):
        response = self.c.get(
            '/useractivity/reactions/99999',
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON
        )
        self.assertEqual(response.status_code, 404)
    
    def test_get_reaction_by_id_successfully(self):
        reaction = Reaction.objects.get(type=REACTION_TYPE_NAME)
        response = self.c.get(
            '/useractivity/reactions/'+str(reaction.pk),
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON
        )
        res_obj = json.loads(response.content.decode('UTF-8'))

        self.assertEqual(response.status_code, 200)
        self.assertEqual(res_obj['type'], REACTION_TYPE_NAME)

    def test_delete_reaction(self):
        reaction = Reaction.objects.get(type=REACTION_TYPE_NAME)

        response = self.c.delete(
            '/useractivity/reactions/'+str(reaction.pk),
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON
        )

        self.assertEquals(response.status_code, 204)
    
    def test_delete_HTTP404_reaction(self):
        reaction = Reaction.objects.get(type=REACTION_TYPE_NAME)

        response = self.c.delete(
            '/useractivity/reactions/999',
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON
        )

        self.assertEquals(response.status_code, 404)

    def test_delete_reaction_by_comment_user_id(self):
        user_id = User.objects.get(username=USER1_USERNAME).pk
        comment_id = Comment.objects.get(message=COMMENT_MESSAGE_1).pk
        reaction = Reaction.objects.get(author=user_id,comment=comment_id)

        response = self.c.delete(
            '/useractivity/reactions/comments/'+str(comment_id)+'/user/'+str(user_id)+'/type/'+str(reaction.type),
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON
        )

        self.assertEquals(response.status_code, 204)
    

    