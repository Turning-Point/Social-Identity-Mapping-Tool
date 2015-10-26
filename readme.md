
# Social Identity Mapping Tool

This project is the initial results of the SONAR team at [Health Hack](http://healthhack.com.au/) Melbourne 2015.  [Turning Point](http://www.turningpoint.org.au/) requested that we:

> Develop a prototype of a paper-based tool as an interactive app (tablet / web) that allows people to audit, visualise and map their social relationships and substance use and other risky behaviours.

We spent a measure of our initial time collaborating on UX, and came up with what we feel (but have not been able to test yet) are improvements to the data collection / interview process, and to the presentation / comprehensibility of the tool.

The prototype doesn't completely implement the design we came up with: 

![Social Identity Mapping Tool design](./assets/social-identity-mapping-tool-v1.png).


## The future

Currently, we're just displaying the results of dummy data, and there is no backend.

- add a create / update form interface for entering data
- load and save data to parse.com

We had all sorts of grandiose ideas, which we hope can be developed in future.


## Installing, running the prototype

Requires [node.js](https://docs.npmjs.com/getting-started/installing-node): 

    cd <project-directory>
    npm install
    npm start

To serve the files, open another terminal tab and run:

    cd <project-directory>
    npm install -g browser-sync
    browser-sync start --server --directory --files "**"
