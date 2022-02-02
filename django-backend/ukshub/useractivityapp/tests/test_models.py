from django.utils import timezone
from django.test import TestCase

from ..models import ActionType, ReactionType, Action, Reaction, Comment
from versioningapp.models import Repository
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
User = get_user_model()

from django.db import IntegrityError

# User init consts
USER1_USERNAME = 'user1'
USER1_PASSWORD = 'Ovojejakasifra!'
USER1_FIRST_NAME = 'Ivana'
USER1_LAST_NAME = 'Perisic'
USER1_EMAIL = 'ica@gmail.com'

USER2_USERNAME = 'user2'
USER2_PASSWORD = 'Ovojejakasifra!'
USER2_FIRST_NAME = 'Ivana'
USER2_LAST_NAME = 'Perisic'
USER2_EMAIL = 'ica2@gmail.com'

USER3_USERNAME = 'user3'
USER3_PASSWORD = 'Ovojejakasifra!'
USER3_FIRST_NAME = 'Ivana'
USER3_LAST_NAME = 'Perisic'
USER3_EMAIL = 'ica3@gmail.com'

REPO1_NAME = 'RepoUKS'
ACTION_TYPE_NAME = 'fork'
REACTION_TYPE_NAME = 'Reaction'# User init consts
USER1_USERNAME = 'user1'
USER1_PASSWORD = 'Ovojejakasifra!'
USER1_FIRST_NAME = 'Ivana'
USER1_LAST_NAME = 'Perisic'
USER1_EMAIL = 'ica@gmail.com'

USER2_USERNAME = 'user2'
USER2_PASSWORD = 'Ovojejakasifra!'
USER2_FIRST_NAME = 'Ivana'
USER2_LAST_NAME = 'Perisic'
USER2_EMAIL = 'ica2@gmail.com'

USER3_USERNAME = 'user3'
USER3_PASSWORD = 'Ovojejakasifra!'
USER3_FIRST_NAME = 'Ivana'
USER3_LAST_NAME = 'Perisic'
USER3_EMAIL = 'ica3@gmail.com'

REPO1_NAME = 'RepoUKS'
ACTION_TYPE_NAME = 'fork'
REACTION_TYPE_NAME = 'Reaction'
REACTION_TYPE_NAME_2 = 'Reaction 2'

COMMENT_MESSAGE_1 = 'Komentar1'
COMMENT_MESSAGE_2 = 'Komentar2'

# INFO: Do not change some values without a very good testing, because a lot of test cases are checked by those values
def initialize_db_with_test_data():

    # INFO: Do not change some values without a very good testing, because a lot of test cases are checked by those values
    # Create users
    user1 = User.objects.create_user(
      username=USER1_USERNAME, 
      password=USER1_PASSWORD,
      first_name=USER1_FIRST_NAME,
      last_name=USER1_LAST_NAME,
      email=USER1_EMAIL,
      is_superuser = True, 
      is_staff=True)

    user2 = User.objects.create_user(
      username=USER2_USERNAME, 
      password=USER2_PASSWORD,
      first_name=USER2_FIRST_NAME,
      last_name=USER2_LAST_NAME,
      email=USER2_EMAIL,
      is_superuser = False, 
      is_staff=False)

    user3 = User.objects.create_user(
      username=USER3_USERNAME, 
      password=USER3_PASSWORD,
      first_name=USER3_FIRST_NAME,
      last_name=USER3_LAST_NAME,
      email=USER3_EMAIL,
      is_superuser = False, 
      is_staff=False)

    user1.save()
    user2.save()
    user3.save()

    # Create repositories
    repository1 = Repository.objects.create(author=user1, name=REPO1_NAME)
    
    repository1.save()

    # Create ActionType
    actionType1 = ActionType.objects.create(name=ACTION_TYPE_NAME)

    actionType1.save()

    # Create ReactionType
    reactionType1 = ReactionType.objects.create(name=REACTION_TYPE_NAME)
    reactionType2 = ReactionType.objects.create(name=REACTION_TYPE_NAME_2)

    reactionType1.save()
    reactionType2.save()

    # Create actions
    action1 = Action.objects.create(author=user1, repository=repository1, action_type=actionType1.name, new_forked_repository=repository1)

    action1.save()

    
    # Create comment
    comment1 = Comment.objects.create(author=user1, message=COMMENT_MESSAGE_1,  creation_date="2022-01-30 22:03:08.405+01")
    comment2 = Comment.objects.create(author=user1, message=COMMENT_MESSAGE_2,  creation_date="2022-01-30 22:03:08.405+01")

    comment1.save()
    comment2.save()

    #Create reaction
    reaction1 = Reaction.objects.create(author=user1,comment=comment1,type=reactionType1.name)
    reaction2 = Reaction.objects.create(author=user2,comment=comment1,type=reactionType2.name)

    reaction1.save()
    reaction2.save()
    
def get_action_type(index=0):
    return ActionType.objects.all()[index]

def get_reaction_type(index=0):
    return ReactionType.objects.all()[index]

def get_action(index=0):
    return Action.objects.all()[index]

def get_reaction(index=0):
    return Reaction.objects.all()[index]

def get_comment(index=0):
    return Comment.objects.all()[index]

class TestActionTypeModel(TestCase):
    
    @classmethod
    def setUpTestData(cls):
        initialize_db_with_test_data()

    def test_action_type_name(self):
        action_type = get_action_type()
        verbose_name = action_type._meta.get_field('name').verbose_name
        self.assertEquals(verbose_name, 'name')

    def test_action_name_max_length(self):
        action_type = get_action_type()
        max_length = action_type._meta.get_field('name').max_length
        self.assertEquals(max_length, 200)

class TestReactionTypeModel(TestCase):
    
    @classmethod
    def setUpTestData(cls):
        initialize_db_with_test_data()

    def test_reaction_type_name(self):
        reaction_type = get_reaction_type()
        verbose_name = reaction_type._meta.get_field('name').verbose_name
        self.assertEquals(verbose_name, 'name')

    def test_reaction_name_max_length(self):
        reaction_type = get_reaction_type()
        max_length = reaction_type._meta.get_field('name').max_length
        self.assertEquals(max_length, 200)

class TestActionModel(TestCase):

    @classmethod
    def setUpTestData(cls):
        initialize_db_with_test_data()

    def test_action_author_username(self):
        action = get_action()
        self.assertEqual(action.author.username, USER1_USERNAME)

    def test_action_repository_name(self):
        action = get_action()
        self.assertEqual(action.repository.name, REPO1_NAME)

    def test_action_new_forked_repository_name(self):
        action = get_action()
        self.assertEqual(action.repository.name, REPO1_NAME)

class TestCommentModel(TestCase):

    @classmethod
    def setUpTestData(cls):
        initialize_db_with_test_data()

    def test_action_author_username(self):
        comment = get_comment()
        self.assertEqual(comment.author.username, USER1_USERNAME)

    def test_comment_message(self):
        comment = get_comment()
        verbose_name = comment._meta.get_field('message').verbose_name
        self.assertEquals(verbose_name, 'message')

    def test_comment_message_max_length(self):
        comment = get_comment()
        max_length = comment._meta.get_field('message').max_length
        self.assertEquals(max_length, 200)

class TestReactionModel(TestCase):

    @classmethod
    def setUpTestData(cls):
        initialize_db_with_test_data()

    def test_reaction_comment_message(self):
        reaction = get_reaction()
        self.assertEqual(reaction.comment.message, COMMENT_MESSAGE_1)

    def test_reaction_author_username(self):
        reaction = get_reaction()
        self.assertEqual(reaction.author.username, USER1_USERNAME)

    def test_reaction_type_name(self):
        reaction = get_reaction()
        self.assertEqual(reaction.type, REACTION_TYPE_NAME)



    

