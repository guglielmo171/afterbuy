# AfterBuy — Product

## Problem

Post-purchase information is fragmented by default. A return deadline sits in one email, a refund update in another, and the receipt or warranty details appear only when something goes wrong. The result is not merely clutter: a missed deadline can mean money, time, or a support option lost.

## Primary user

The first version is designed for a frequent online shopper with a handful of open purchases across several stores. They do not need a complete personal finance tool. They need to know whether anything requires attention before it becomes too late.

## First useful slice

AfterBuy groups the context that changes a decision:

- what was bought and where;
- the relevant return or warranty date;
- the current return, refund, or warranty state;
- the reason the purchase needs attention now;
- links or references that help the user act.

The dashboard answers *what needs attention?* The purchase detail answers *what do I need to know to deal with it?*

## Current boundary

The product is still being built. The intended first loop is to add a purchase, derive relevant dates, surface an action when appropriate, and record a meaningful lifecycle update.

This stage does not include accounts, collaboration, real file uploads, OCR, merchant or bank connections, automatic refund tracking, notifications, or legal advice. Those are separate product problems, not omissions hidden behind marketing language.

## Why this is a useful engineering problem

The product has small but meaningful rules: calendar dates, urgency, lifecycle transitions, validation, and a responsive interface that prioritises the right item. It is enough to exercise frontend architecture and a lightweight persistence boundary without pretending to be a full consumer platform.
