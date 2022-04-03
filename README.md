# garbage-collector-game
Ludum Dare game, about garbage collector

# how to run
nodemon index.js


# about gc

https://www.oracle.com/technetwork/tutorials/tutorials-1873457.html

Stop the World Event - All minor garbage collections are "Stop the World" events. This means that all application threads are stopped until the operation completes. Minor garbage collections are always Stop the World events.

The Old Generation is used to store long surviving objects. Typically, a threshold is set for young generation object and when that age is met, the object gets moved to the old generation. Eventually the old generation needs to be collected. This event is called a major garbage collection.

Major garbage collection are also Stop the World events. Often a major collection is much slower because it involves all live objects. So for Responsive applications, major garbage collections should be minimized. Also note, that the length of the Stop the World event for a major garbage collection is affected by the kind of garbage collector that is used for the old generation space.

https://sematext.com/blog/java-garbage-collection-logs/

![](doc/gc-promotion.png)

    Minor garbage collection
    Major garbage collection
    Full garbage collection

Minor garbage collection means that the young generation space clearing event was performed by the JVM. The minor garbage collector will always be triggered when there is not enough memory to allocate a new object on the heap, i.e. when the Eden generation is full or is getting close to being full. If your application creates new objects very often you can expect the minor garbage collector to run often. What you should remember is that during minor garbage collection, when cleaning the Eden and survivor spaces the data is copied entirely which means that no memory fragmentation will happen.

Major garbage collection means that the tenured generation clearing event was performed. The tenured generation is also widely called the old generation space. Depending on the garbage collector and its settings the tenured generation cleaning may happen less or more often. Which is better? The right answer depends on the use case and we will not be covering it in this blog post.

Java Full GC means that the full garbage collection event happened. Meaning that both the young and old generation was cleared. The garbage collector tried to clear it and the log tells us what the outcome of that procedure was. Tenured generation cleaning requires mark, sweep, and compact phases to avoid high memory fragmentation. If a garbage collector wouldn’t care about memory fragmentation you could end up in a situation where you have enough memory, but it is fragmented and the object can’t be allocated. We can illustrate this situation with the following diagram:

# External resources

https://web.dev/one-line-layouts/
https://css-tricks.com/snippets/css/a-guide-to-flexbox/#aa-flexbox-properties
https://www.w3schools.com/cssref/css3_pr_animation-keyframes.asp
https://www.w3schools.com/css/css3_animations.asp
https://javascript.info/js-animation
https://www.codegrepper.com/code-examples/javascript/javascript+run+a+function+every+x+seconds
https://levelup.gitconnected.com/use-javascript-to-make-an-element-follow-the-cursor-3872307778b4
https://stackoverflow.com/questions/43061417/how-to-listen-for-custom-events-defined-web-component
