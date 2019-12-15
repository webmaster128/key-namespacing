# Key namespacing for simple key value databases

The goal of this is to find an approach to namespacing for simple key value
databases such auch leveldb with the following properties:

1. Application level namespaces and keys can have any length and binary value
2. Collision resistent, i.e. two keys in different namespaces can never have the
   same binary encoding
3. Lexicographically sort order within a namespace remains intact
4. Lexicographically sort order of namespaces
5. Multi-level namespaces

## Syntax

Throughout this document, we denote binary concatenation as `|`. Characters
wrapped in single quotes `'a'` denote the ascii value of the character (C/C++
syntax).

## Naive approach

The naive approach to namespacing is to concatenate the namespace with the key
directly (`namespace | key`). However, this is not collision resistent if you
want to support namespaces that are prefixes of each other.

A simpler counter example is `foo:bar` and `fo:obar`, which both have the same
binary representation. This means we don't get property 2.

## Length-prefixed keys

To avoid the shared prefix issue, we can prepend the length to the namespace:
`len(namespace) | namespace | key` where `len()` returns fixed size data with
the number of bytes in `namespace`.

Our examples `foo:bar` and `fo:obar` now look like

```
2foobar
3foobar
```

Since all resulting keys in the same namespace have a common prefix, the order
within the namespace is preserved. A range query `"foo" <= x < "fop"` returns
all keys within `foo:` in order.

This approach achieves properties 1.-3.

## 0x00 separated ASCIIHEX

In order to get lexicographically ordered namespaces, we need to avoid the
length prefix. Instead we need a way to separate between namespace and key.
Since both namespace and key can fill the full binary range, we encode namespace
and key in a way it does not use the full binary range. This binary to binary
encoding needs to be order preserving, i.e. for every two byte arrays `a < b` we
get `encoding(a) < encoding(b)`. One encoding that fulfills this requirement is
hex, or more precisely the ascii encoding of hex `ascihex(x) := ascii(hex(x))`.
We use lower case hex for no reason other than the need to fix a casing. The
output range of asciihex is `'0' - '9'` (i.e. 48-57) and `'a' - 'f'` (i.e.
97-102). When we asciihex encode the namespace and the key, we can use the null
byte [0x00 as a separator](docs/choice_of_separator.md):

```
asciihex(namespace) | 0x00 | asciihex(key)
```

The example from above is now encoded like

```
asciihex("fo") | 0x00 | asciihex("obar")
asciihex("foo") | 0x00 | asciihex("bar")
```

i.e.

```
'6' '6' '6' 'f'  0  '6' 'f' '6' '2' '6' '1' '7' '2'
'6' '6' '6' 'f' '6' 'f'  0  '6' '2' '6' '1' '7' '2'
```

This approach can easily be generalized to multi-level namespaces. It gives us
properties 1.-5. at the cost of approximately 2x of the orginal key size, which
can probably be compressed to almost the original size on disk
[when using a compressing database implementation](https://github.com/google/leveldb/blob/v1.20/include/leveldb/options.h#L19-L28).
