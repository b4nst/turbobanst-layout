![logo](logo.png)

A modern keyboard layout for developers

- [TL;DR](#tldr)
- [Data analysis](#data-analysis)
  - [Complete list of repo used](#complete-list-of-repo-used)

## TL;DR

turbobanst is an attempt to build a better keyboard layout, dedicated in typing modern code.

## Data analysis

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
