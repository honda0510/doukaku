import unittest
from q10_1 import poker

class PokerTest(unittest.TestCase):

    def test_loyal_flash(self):
        self.assertEqual(poker('KdAdJd10dQd'), 'RF')
        self.assertEqual(poker('QhJhKhAh10h'), 'RF')
        self.assertEqual(poker('Js10sAsQsKs'), 'RF')
        self.assertEqual(poker('10dKdQdAdJd'), 'RF')

    def test_straight_flash(self):
        self.assertEqual(poker('4d3d2dAd5d'), 'SF')
        self.assertEqual(poker('10h8h9hJhQh'), 'SF')
        self.assertEqual(poker('10h9hQhKhJh'), 'SF')
        self.assertEqual(poker('6d4d7d5d3d'), 'SF')
        self.assertEqual(poker('6h9h7h5h8h'), 'SF')

    def test_flash(self):
        self.assertEqual(poker('Kd10dAdJd3d'), 'FL')
        self.assertEqual(poker('5d5d2d3dAd'), 'FL')
        self.assertEqual(poker('3s8s10sQs6s'), 'FL')
        self.assertEqual(poker('6hAh3h2h8h'), 'FL')
        self.assertEqual(poker('3h4hJh9hQh'), 'FL')
        self.assertEqual(poker('3s6s5s2sQs'), 'FL')

    def test_straight(self):
        self.assertEqual(poker('10dAdJsQdKd'), 'ST')
        self.assertEqual(poker('4d2sAd5d3d'), 'ST')
        self.assertEqual(poker('As10dJdQdKd'), 'ST')
        self.assertEqual(poker('3d2dAh5d4s'), 'ST')
        self.assertEqual(poker('9sKsJcQs10d'), 'ST')
        self.assertEqual(poker('5d3c2cAs4c'), 'ST')
        self.assertEqual(poker('KcQs9c10sJs'), 'ST')
        self.assertEqual(poker('9d8s10hJdQd'), 'ST')
        self.assertEqual(poker('AcJd10dQdKd'), 'ST')

    def test_four_straight_flash(self):
        self.assertEqual(poker('Kd2sJdAdQd'), '4SF')
        self.assertEqual(poker('Ac6s4s3s5s'), '4SF')
        self.assertEqual(poker('3c9d2c5c4c'), '4SF')
        self.assertEqual(poker('Kh2sQh10hJh'), '4SF')
        self.assertEqual(poker('4h5h2h3h4s'), '4SF')

    def test_four_flash(self):
        self.assertEqual(poker('10d10dQdAsJd'), '4F')
        self.assertEqual(poker('KdAdKdJd2s'), '4F')
        self.assertEqual(poker('As2dKdQdJd'), '4F')
        self.assertEqual(poker('3d4dKd8d5c'), '4F')
        self.assertEqual(poker('10h3hQh9h2s'), '4F')
        self.assertEqual(poker('Qh5h7h9h6c'), '4F')
        self.assertEqual(poker('6s8s7s3sKc'), '4F')

    def test_four_straight(self):
        self.assertEqual(poker('Qs9s3dJd10h'), '4S')
        self.assertEqual(poker('JdAdQcKd2s'), '4S')
        self.assertEqual(poker('AsKdQd2dJh'), '4S')
        self.assertEqual(poker('Ad4dKh3s2d'), '4S')
        self.assertEqual(poker('QcKdAs2dJd'), '4S')
        self.assertEqual(poker('4d7d5s3c2d'), '4S')
        self.assertEqual(poker('6c5s10h7d4c'), '4S')
        self.assertEqual(poker('QhJcKsAh8c'), '4S')
        self.assertEqual(poker('JsQc3h10cKs'), '4S')
        self.assertEqual(poker('10c9h7hAd8d'), '4S')

    def test_other(self):
        self.assertEqual(poker('QhAd2s3dKd'), '-')
        self.assertEqual(poker('2dQcJdAs10d'), '-')
        self.assertEqual(poker('7d5s4dAd3c'), '-')
        self.assertEqual(poker('9d3cKdQc2c'), '-')
        self.assertEqual(poker('5sKs7hQcKh'), '-')
        self.assertEqual(poker('Ad6d7h7c9h'), '-')
        self.assertEqual(poker('10h4cAh6s10c'), '-')

if __name__ == '__main__':
    unittest.main()
