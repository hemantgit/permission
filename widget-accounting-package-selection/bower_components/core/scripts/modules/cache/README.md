#cache

Provides generic cache system. Use this module to cache async calls.

##Table of content

- [Factories](#factories)
    - [lpCoreHttpCache](#lpCoreHttpCache)
    - [lpCoreCachePromise](#lpCoreCachePromise)

##Content

###Factories

####<a name="lpCoreHttpCache"></a>lpCoreHttpCache

Common http cache functional. Invalidate timeout can be configured from portal manager with a page property `httpCacheTimeout`, is `0` by default.
To clear cache can be executed
```
lpCoreHttpCache.remove(key);
lpCoreHttpCache.removeAll();
```

####<a name="lpCoreCachePromise"></a>lpCoreCachePromise

Returns cached promise for the key if it exists.
Otherwise calls the function returning promise, and return it.

Params:

| Param| Type| Description|
| :----| :----| :----|
| options| Object| Object containing:   {String} key        Cache key   {Function} promise  Function returning promise|

