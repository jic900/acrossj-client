Production Install Info
=======================

To install only the minimum runtime modules (no dev or optional dependencies)
> npm install --production --no-optional


Gulp Task Runner README
=======================
'npm install gulp -g' to install gulp globally. This is required for using gulp on command line.

Gulp will read gulpfile.js to construct a series of tasks that can be executed. Within this project these tasks have
been split into a number of different files within the ./tasks directory. The main gulpfile.js will read all tasks
within all Javascript files in that directory.

Here is an abbreviated list of the important tasks for this project:

'gulp admin' - This task will compile the angular admin interface, serve the admin interface static files, and load the
                    admin node server. After loading this task will also create a file watch on the angular admin and
                    the admin server and reload if files are changed. Angular web page will automatically refresh on
                    file save via livereload.

'gulp public' - This task will compile the angular public interface, serve the public interface static files, and load the
                    public node server. After loading this task will also create a file watch on the angular public and
                    the public server and reload if files are changed. Angular web page will automatically refresh on
                    file save via livereload.

'gulp build' -  This task will create a full build of the project.

'gulp' or 'gulp dist' or 'gulp default' - This task will do a full build then generate the distribution archive of
                    this project.

'gulp clean' - This task will remove /build and /logs directories that are used during development. /dist is not removed.




Development Environment CheatSheet
==================================
This document will contain some quick and dirty stepup instructions to get you running locally if you are unfamiliar with the project

SETUP
Install node
    note that your Environment PATH variable should now contain a path to node.
Install PostgreSQL
    Keep the defaults (Port 5432)
    At somepoint you'll create a user/pwd (not sure when), keep that info for the config file below.

CHECKOUT
    SVN Checkout to a folder of your choice

CONFIGURATION
    CMD into the trunk subfolder folder
    > npm install gulp -g (if not done at some point in the past)
    > npm install
    > gulp build
    > gulp dist

    CD to the dist folder and delete all files other than the newly created zip.
        You may want to capture you local.config file (referenced below)
    Unzip the zip into dist (you can delete the zip if you want)
    CD node\config
    Add a local.config if needed
        (The local.config can be reduced to only those properties you want to override what is in default.  Consider your ports and the database.)

LAUNCH
    The project is structured to run as three different servers.

    Two backends (apis)
        CD back to node
        > node server-public
        > node server-admin

   One front end.  This can be run as an NGINX proxy which is what will be done with the production instance, but it can also be run with gulp.

