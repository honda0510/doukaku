import unittest
from q01_1 import poker

class PokerTest(unittest.TestCase):

    def test_fullhouse(self):
        self.assertEqual(poker('D3C3C10D10S3'), 'FH')

    def test_four_cards(self):
        self.assertEqual(poker('S10D10HJH10C10'), '4K')

    def test_three_cards(self):
        self.assertEqual(poker('SJD10HJS9CJ'), '3K')

    def test_two_pair(self):
        self.assertEqual(poker('S8D10HJS10CJ'), '2P')

    def test_one_pair(self):
        self.assertEqual(poker('S3D2HKS7CK'), '1P')

    def test_other(self):
        self.assertEqual(poker('S3D2HKS7CQ'), '--')
        
if __name__ == '__main__':
    unittest.main()
