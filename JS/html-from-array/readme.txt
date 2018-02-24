This was a small project to create HTML tags using an array of elements.

Simple Rules:

-An array represents a tag and content
-The first element of the array is the tag name
-Subsequent elements in the array can contain arrays
-Arrays with only one element create self closing tags

Example:

['div', ['h1', Header], Hello, ['span']]  should output:

<div>
    <h1>Header</h1>
    Hello
    <span/>
</div>