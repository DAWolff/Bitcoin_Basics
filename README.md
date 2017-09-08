## Synopsis

An easy-peasy Bitcoin basics website.
Get the current Bitcoin exchange rate versus the highest-volume traded currencies.
website starts with 1 Bitcoin versus the US Dollar.
Links to Bitcoin beginner's videos and websites with additional information.

## Notes

Responsive from 320px to 1600px.  (Note that I did not style for mobile landscape).
A landing page was not included, since:
* It isn't necessary
* It would make the site boring
* The entire site is one page

## Code Example

Gets the "secondary currency" from the user, and does a JSONP API call to
	https://www.coinhills.com/api/BTC/[secondary_currency]/?callback=extractResults

This is done by dynamically adding the <script> tag to the HTML for each call (and then remove tag).

## Motivation

To make it simple to get started with Bitcoin-- to understand how it works, and get the current price using the top world-wide currencies that are used to buy Bitcoin.  

## Installation

Project is at GitHub Pages:
		 https://dawolff.github.io/Capstone-Project-1---Bitcoin/


## API Reference


## Tests


## Contributors

Created by Dennis Wolff
