<?php
/**
 * @file
 * drupal_angular_seed_tout.features.inc
 */

/**
 * Implements hook_node_info().
 */
function drupal_angular_seed_tout_node_info() {
  $items = array(
    'tout' => array(
      'name' => t('Tout'),
      'base' => 'node_content',
      'description' => '',
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
  );
  return $items;
}
