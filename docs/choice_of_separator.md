# Choice of separator

Every value from 0 to 255 other than `'0' - '9'` (i.e. 48-57) and `'a' - 'f'`
(i.e. 97-102) could be used as a separator. However, the choice of the separator
determines the sort order of namespaces that are prefixes of each other.

An initial idea was to use the largest possible byte value 0xFF as the
separator. However, this sorts prefixes after longer namespaces. E.g. "foo:xy"
and "fo:xy" as encoded as

```
asciihex("fo") | ? | asciihex("xy")
asciihex("foo") | ? | asciihex("xy")
```

i.e.

```
'6' '6' '6' 'f'  ?  '7' '8' '7' '9'
'6' '6' '6' 'f' '6' 'f'  ?  '7' '8' '7' '9'

 ^   ^   ^   ^   ^   ^   ^   ^   ^   ^   ^
 1   2   3   4   5   6   7   8   9  10  11
```

where `'6' '6' '6' 'f'` is a 4 byte prefix of `'6' '6' '6' 'f' '6' 'f'`. Looking
at position 5 where the first key has the separator, we see that

1. values less than 48 sorts separators before all ASCIIHEX values;
2. values greater than 102 sorts separators after all ASCIIHEX values;
3. values from 58 to 96 sort separators beween numbers and letters.

While the 3rd option is clearly undesirable, the first two are valid approaches.
Sorting prefixes before their extensions seems to be standard in
lexicographically sorting, try e.g.

```
$ echo "fo\nfoo\nf\nfoo123" | sort
f
fo
foo
foo123
```

or

```
$ node -e "console.log(['foo123', 'f', 'foo', 'fo'].sort())"
[ 'f', 'fo', 'foo', 'foo123' ]
```

For this reason we use option 1., the 0x00 separator.
