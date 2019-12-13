# Key namespacing for simple key value databases

The goal of this is to find an approach to namespacing for simpley key value databases such auch leveldb with the following properties:

1. Collision resistent, i.e. two keys in different namespaces can never have the same binary encoding
2. Lexicographically sort order within a namespace remains intact
3. Lexicographically sort order of namespaces
4. Multi-level namespaces

## Naive approach

## Length-prefixed keys

## 0xFF separated
