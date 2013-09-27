# Responsive Images

The [Proposal for Responsive Images](http://tabatkins.github.io/specs/respimg/Overview.html) describes a syntax which allows a user agent to choose an appropriate version of an image from several candidates. This is accomplished by adding a set of attributes to `<img>`, named **src1**, **src2**, etc. Collectively, these are the **srcN** attributes.

The grammar for these attributes are:

```
  <srcn-attribute> = <media-query>? [ <x-based-urls> | <viewport-urls> ]
  <x-based-urls> = [ <url> <resolution>? ]#

  <viewport-urls> = <size-viewport-list> ; <size-based-urls>
  <size-viewport-list> = <image-size> [ <viewport-size> <image-size> ]*
  <image-size> = <integer> | <percentage>
  <viewport-size> = <length>
  <size-based-urls> = [ <url> <integer> ]#
```

This prollyfill attempts to mimic that functionality. It is in the earliest stages.

[Proposal for RespImg Syntax](http://tabatkins.github.io/specs/respimg/Overview.html)

## Status of the Prollyfill

Successfully parsing MQ4 media queries, which are grouped queries inside parenthesis `()`, separated by `and`. They do not account for `screen`, `print`, etc. which may be removed in MQ4.

Successfully parsing viewport urls.

---

All of these contributions to the **Proposal for Responsive Images** are dedicated to the [public domain with no copyright](//creativecommons.org/publicdomain/zero/1.0/).