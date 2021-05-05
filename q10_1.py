import re

def poker(text):
    text = re.sub(r'([A2-9JQK]|10)', r',\1', text)
    hands = text[1:].split(',')
    nums = sorted([to_num(h[:-1]) for h in hands])

    flash = is_flash(hands)
    straight = is_straight(nums)

    if flash and straight:
        if (1 in nums) and (13 in nums):
            return 'RF'
        else:
            return 'SF'
    elif flash:
        return 'FL'
    elif straight:
        return 'ST'

    flash_suit = four_flash(hands)

    if flash_suit != '':
        if is_four_straight_flash(flash_suit, hands):
            return '4SF'
        else:
            return '4F'
    elif is_four_straight(nums):
        return '4S'

    return '-'

def to_num(str):
    if str == 'A':
        return 1
    elif str == 'J':
        return 11
    elif str == 'Q':
        return 12
    elif str == 'K':
        return 13
    else:
        return int(str)

def is_flash(hands):
    return suit_num(hands[0][-1], hands) == 5

def four_flash(hands):
    for h in hands:
        if suit_num(h[-1], hands) == 4:
            return h[-1]

    return ''

def suit_num(suit, hands):
    _hands = filter(lambda h: h[-1] == suit, hands)
    return len(list(_hands))

def is_straight(nums):
    if _is_straight(nums):
        return True
    elif 1 in nums:
        _nums = sorted([14 if n == 1 else n for n in nums])
        return _is_straight(_nums)
    else:
        return False

def is_four_straight_flash(suit, hands):
    _hands = filter(lambda h: h[-1] == suit, hands)
    nums = sorted([to_num(h[:-1]) for h in _hands])
    return is_straight(nums)

def is_four_straight(nums):
    if _is_straight(nums[:-1]):
        return True
    elif _is_straight(nums[1:]):
        return True
    elif 1 in nums:
        _nums = sorted([14 if n == 1 else n for n in nums])
        if _is_straight(_nums[:-1]):
            return True
        elif _is_straight(_nums[1:]):
            return True

    return False

def _is_straight(nums):
    for i, v in enumerate(nums[:-1]):
        if v + 1 != nums[i + 1]:
            return False

    return True
