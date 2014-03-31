<?php
/**
 * @file
 * drupal_angular_seed_news.features.inc
 */

/**
 * Implements hook_node_info().
 */
function drupal_angular_seed_news_node_info() {
  $items = array(
    'news_post' => array(
      'name' => t('News Post'),
      'base' => 'node_content',
      'description' => '',
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
  );
  return $items;
}
