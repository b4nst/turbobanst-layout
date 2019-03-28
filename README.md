![logo](logo.png)

A modern keyboard layout for developers

- [TL;DR](#tldr)
- [A bit of lecture](#a-bit-of-lecture)
  - [History](#history)
  - [Keyboard heatmap](#keyboard-heatmap)
- [Bounds](#bounds)
  - [WQAZXCV](#wqazxcv)
  - [Brackets ([{<>}])](#brackets)
  - [About <kbd>CAPSLOCK</kbd>](#about-kbdcapslockkbd)
- [Data analysis](#data-analysis)
  - [Concepts](#concepts)
  - [Complete list of repo used](#complete-list-of-repo-used)
  - [Results](#results)

## TL;DR

turbobanst is an attempt to build a better keyboard layout, dedicated in typing modern code.

## A bit of lecture

### History

*W.I.P.*

### Keyboard heatmap

*W.I.P.*

## Bounds

### WQAZXCV

Best effort will be made to keep the WQAZXCV keys confortable and convenient when used in conjunction with the <kbd>Cmd</kbd> / <kbd>Ctrl</kbd> key, in order to keep the most used shortcuts simple.

### Brackets ([{<>}])

On classic keyboard layout (like qwerty) opening brackets and the matching closing bracket are often on 2 adjacents keys. But nowadays, any proper IDE will automatically close the bracket for you as soon as you open it. To be more friendly with that concept, opening bracket and its soulmate will be on the same key. One on the normal layout (open), the other on the <kbd>SHIFT</kbd> layer.

### About <kbd>CAPSLOCK</kbd>

Choice has been made to remove (or at least send it to an *fn layout*) the caps lock key. Why is that ? Because average usage of the caps lock key for chill people is very low. It would be more convenient, as first implemented in [Colemak layout](https://colemak.com) to replace the caps lock key bey a second - left handed - backspace.

## Data analysis

### Concepts

In order to help with key placement, a bunch of modern source code taken from few of the most popular Github repos has been parsed. 

The metrics extracted are :

- Count of apparition for each character (including blank ones)
- Count of link between each character (link = adjacent character)

### Complete list of repo used

| Language   | Repo                                                                          | Data size |
|------------|-------------------------------------------------------------------------------|-----------|
| go         | [go](https://github.com/golang/go)                                            | 1.1M      |
| javascript | [node](https://github.com/nodejs/node)                                        | 1.1M      |
| python     | [algorithms](https://github.com/keon/algorithms)                              | 820k      |
| rust       | [xi-editor](https://github.com/xi-editor/xi-editor/tree/master/rust/rope/src) | 1.1M      |
| scala      | [scala](https://github.com/scala/scala)                                       | 1008K     |
| typescript | [angular](https://github.com/angular/angular)                                 | 668K      |

### Results

*W.I.P.*