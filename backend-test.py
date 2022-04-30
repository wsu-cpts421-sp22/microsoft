import unittest
from demo import get_Token_Data

class Testing(unittest.TestCase):
    def test_get_token_data(self):
        token = get_Token_Data()
        token_keys =  list(token.keys())

        # every token should have the expiry and the token
        self.assertEqual(token_keys, ['msft:expiry', 'token'])

        # equivalent of saying not null. Meaning the field should not be empty.
        self.assertTrue(token['msft:expiry'])
        self.assertTrue(token['token'])

if __name__ == "__main__":
    unittest.main()