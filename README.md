# CDN...Whaat!

This script simply helps you checking
that some files have been uploaded to
your CDN.

It is usually common to build some assets
(optimized images, minified JS) on your server
and then send them to your CDN -- but better
check they have **really** been uploaded,
else your deployment will reserve you
some nasty surprises!

## Installation

Install this module globally

```
npm install -g cdnwhaaat
```

## Usage

```
cdnwhaaat /path/to/your/assets --cdn=https://cdn.example.org/assets/ [--tries 5] [--sleep 3]
```

The first argument is the path to your assets on
the machine where `cdnwhaaat` is running: it will
recursively iterate through the contents of that path
and extract the files that need to be checked on the
`--cdn` argument.

In the example above, say there is a `sample.txt` file in 
`/path/to/your/assets`, then `cdnwhaaat` will try to hit it
at `https://cdn.example.org/assets/sample.txt`.

The `--tries` argument specifies how many times `cdnwhaat`
should try to hit that file until it should consider it failed
(a hit is considered successful when it returns `200 Ok`).

The `--sleep` argument will instead specify how many seconds
we will wait before the next attempt: in the example above we
try 5 times, with 3 seconds between each try.

```
~/projects/namshi/cdnwhaaat  ᐅ cdnwhaaat /tmp/cdn --cdn=https://a.namshicdn.com/ --tries 3 --sleep 1
Attempting to verify everything is on the CDN (1)
Attempting to verify everything is on the CDN (2)
Attempting to verify everything is on the CDN (3)
Some resources weren't found on the CDN
https://a.namshicdn.com/phoenix/styles/some.html
```

## Tests

https://camo.githubusercontent.com/f87943961a595be24c82e4505219bd945c110c72/687474703a2f2f67616c657269322e756c75646167736f7a6c756b2e636f6d2f3334322f62697463682d706c656173655f3435393239322e6a7067

For real, still trying to figure how to
do them.