drupal-angular-seed
===================

Seed project for Drupal fed angular apps.

INSTALLATION
------------

Drupal:
  1. Download the dependencies for, and enable, the drupal_angular_seed_* features modules. It's recommended you add these to a Drupal site install with the minimal profile.
  2. Visit admin/structure/features and make sure the features are all reverted

AngularJS:
  1. Change the URL in angular/app/js/services.js to point to your Drupal install.
  2. Point your webserver to angular/app

FUN THINGS TO TRY
-----------------

  * Add a new page and menu item to the main menu
  * Add new touts in drupal_angular_seed_tout.admin.inc and add them into templates
  * Override template files for different content types (see angular/app/_partials/nodes/README.md)
  * Turn on the Drupal path module and add aliases to nodes
  * Create your own listing of content (see drupal_angular_seed_news.module)

NOTES
-----

The seed modules are not intended to be used as-is on your site. You can use https://drupal.org/project/ftools to put the features back into your database and then re-export from there.
