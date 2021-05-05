import re

def poker(text):
    hands = re.split(r'[SHDC]', text[1:])
    counts = [hands.count(h) for h in hands]

    if counts.count(3) == 3 and counts.count(2) == 2:
        return 'FH'
    elif counts.count(4) == 4:
        return '4K'
    elif counts.count(3) == 3:
        return '3K'
    elif counts.count(2) == 4:
        return '2P'
    elif counts.count(2) == 2:
        return '1P'
    else:
        return '--'
