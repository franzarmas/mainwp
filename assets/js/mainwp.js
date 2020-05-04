/* eslint complexity: ["error", 100] */
// current complexity is the only way to achieve desired results, pull request solutions appreciated.

jQuery( document ).ready( function () {

    // review for new UI update
    jQuery( document ).on( 'click', '#mainwp-category-add-submit', function() {
        var newCat = jQuery( '#newcategory' ).val();
        if ( jQuery( '#categorychecklist' ).find( 'option[value="' + encodeURIComponent( newCat ) + '"]' ).length > 0 )
            return;
        jQuery( '#categorychecklist' ).append( '<option value="' + encodeURIComponent( newCat ) + '">' + newCat + '</option>' );
        jQuery( '#category-adder' ).addClass( 'wp-hidden-children' );
        jQuery( '#newcategory' ).val( '' );
    } );

    // Show/Hide new category field and button
    jQuery( '#category-add-toggle' ).on( 'click', function() {
      jQuery( '#newcategory-field' ).toggle();
      jQuery( '#mainwp-category-add-submit-field' ).toggle();
      return false;
    } );

} );

/**
 * Global
 */
jQuery( document ).ready( function () {
    jQuery( '.mainwp-row' ).on( {
        mouseenter: function () {
            rowMouseEnter( this );
        },
        mouseleave: function () {
            rowMouseLeave( this );
        }
    } );
} );
rowMouseEnter = function ( elem ) {
    if ( !jQuery( elem ).children( '.mainwp-row-actions-working' ).is( ":visible" ) )
        jQuery( elem ).children( '.mainwp-row-actions' ).show();
};
rowMouseLeave = function ( elem ) {
    if ( jQuery( elem ).children( '.mainwp-row-actions' ).is( ":visible" ) )
        jQuery( elem ).children( '.mainwp-row-actions' ).hide();
};

/**
 * Recent posts
 */
jQuery( document ).ready( function () {
    jQuery( document ).on( 'click', '.mainwp-post-unpublish', function () {
        postAction( jQuery( this ), 'unpublish' );
        return false;
    } );
    jQuery( document ).on( 'click', '.mainwp-post-publish', function () {
        postAction( jQuery( this ), 'publish' );
        return false;
    } );
    jQuery( document ).on( 'click', '.mainwp-post-trash', function () {
        postAction( jQuery( this ), 'trash' );
        return false;
    } );
    jQuery( document ).on( 'click', '.mainwp-post-restore', function () {
        postAction( jQuery( this ), 'restore' );
        return false;
    } );
   jQuery( document ).on( 'click', '.mainwp-post-delete', function () {
        postAction( jQuery( this ), 'delete' );
        return false;
    } );
    
} );

// Publish, Unpublish, Trash, ... posts and pages
postAction = function ( elem, what ) {
  var rowElement = jQuery( elem ).closest('.grid');
  var postId = rowElement.children( '.postId' ).val();
  var websiteId = rowElement.children( '.websiteId' ).val();

  var data = mainwp_secure_data( {
    action: 'mainwp_post_' + what,
    postId: postId,
    websiteId: websiteId
  } );
  rowElement.hide();
  rowElement.next( '.mainwp-row-actions-working' ).show();
  jQuery.post( ajaxurl, data, function ( response ) {
    if ( response.error ) {
      rowElement.show();
      rowElement.next( '.mainwp-row-actions-working' ).hide();
      rowElement.html( '<div class="sixteen wide column"><i class="times circle red icon"></i> ' + response.error + '</div>' );
    } else if ( response.result ) {
      rowElement.show();
      rowElement.next( '.mainwp-row-actions-working' ).hide();
      rowElement.html( '<div class="sixteen wide column"><i class="check circle green icon"></i>' + response.result + '</div>' );
    } else {
      rowElement.show();
      rowElement.next( '.mainwp-row-actions-working' ).hide();
    }
  }, 'json' );
  return false;
};

/**
 * Plugins Widget
 */
jQuery( document ).ready( function () {
  jQuery( document ).on( 'click', '.mainwp-plugin-deactivate', function () {
    pluginAction( jQuery( this ), 'deactivate' );
    return false;
  } );
  jQuery( document ).on( 'click', '.mainwp-plugin-activate', function () {
    pluginAction( jQuery( this ), 'activate' );
    return false;
  } );
  jQuery( document ).on( 'click', '.mainwp-plugin-delete', function () {
    pluginAction( jQuery( this ), 'delete' );
    return false;
  } );
} );

pluginAction = function ( elem, what ) {
  var rowElement = jQuery( elem ).parent().parent();
  var plugin = rowElement.children( '.pluginSlug' ).val();
  var websiteId = rowElement.children( '.websiteId' ).val();

  var data = mainwp_secure_data( {
    action: 'mainwp_widget_plugin_' + what,
    plugin: plugin,
    websiteId: websiteId
  } );
  rowElement.children().hide();
  rowElement.children( '.mainwp-row-actions-working' ).show();
  jQuery.post( ajaxurl, data, function ( response ) {
    if ( response && response.error ) {
      rowElement.children().show();
      rowElement.html( response.error );
    } else if ( response && response.result ) {
      rowElement.children().show();
      rowElement.html( response.result );
    } else {
      rowElement.children( '.mainwp-row-actions-working' ).hide();
    }
  }, 'json' );

    return false;
};

/**
 * Themes Widget
 */
jQuery( document ).ready( function () {
  jQuery( document ).on( 'click', '.mainwp-theme-activate', function () {
    themeAction( jQuery( this ), 'activate' );
    return false;
  } );
  jQuery( document ).on( 'click', '.mainwp-theme-delete', function () {
    themeAction( jQuery( this ), 'delete' );
    return false;
  } );
} );

themeAction = function ( elem, what ) {
  var rowElement = jQuery( elem ).parent().parent();
  var theme = rowElement.children( '.themeSlug' ).val();
  var websiteId = rowElement.children( '.websiteId' ).val();

  var data = mainwp_secure_data( {
    action: 'mainwp_widget_theme_' + what,
    theme: theme,
    websiteId: websiteId
  } );
  rowElement.children().hide();
  rowElement.children( '.mainwp-row-actions-working' ).show();
  jQuery.post( ajaxurl, data, function ( response ) {
    if ( response && response.error ) {
      rowElement.children().show();
      rowElement.html( response.error );
    } else if ( response && response.result ) {
      rowElement.children().show();
      rowElement.html( response.result );
    } else {
      rowElement.children( '.mainwp-row-actions-working' ).hide();
    }
  }, 'json' );

  return false;
};

// offsetRelative (or, if you prefer, positionRelative)
( function ( $ ) {
    $.fn.offsetRelative = function ( top ) {
        var $this = $( this );
        var $parent = $this.offsetParent();
        var offset = $this.position();
        if ( !top )
            return offset; // Didn't pass a 'top' element
        else if ( $parent.get( 0 ).tagName == "BODY" )
            return offset; // Reached top of document
        else if ( $( top, $parent ).length )
            return offset; // Parent element contains the 'top' element we want the offset to be relative to
        else if ( $parent[0] == $( top )[0] )
            return offset; // Reached the 'top' element we want the offset to be relative to
        else { // Get parent's relative offset
            var parent_offset = $parent.offsetRelative( top );
            offset.top += parent_offset.top;
            offset.left += parent_offset.left;
            return offset;
        }
    };
    $.fn.positionRelative = function ( top ) {
        return $( this ).offsetRelative( top );
    };
}( jQuery ) );

var hidingSubMenuTimers = { };
jQuery( document ).ready( function () {
    jQuery( 'span[id^=mainwp]' ).each( function () {
        jQuery( this ).parent().parent().hover( function () {
            var spanEl = jQuery( this ).find( 'span[id^=mainwp]' );
            var spanId = /^mainwp-(.*)$/.exec( spanEl.attr( 'id' ) );
            if ( spanId ) {
                if ( hidingSubMenuTimers[spanId[1]] ) {
                    clearTimeout( hidingSubMenuTimers[spanId[1]] );
                }
                var currentMenu = jQuery( '#menu-mainwp-' + spanId[1] );
                var offsetVal = jQuery( this ).offset();
                currentMenu.css( 'left', offsetVal.left + jQuery( this ).outerWidth() - 30 );

                currentMenu.css( 'top', offsetVal.top - 15 - jQuery( this ).outerHeight() ); // + tmp);
                subMenuIn( spanId[1] );
            }
        }, function () {
            var spanEl = jQuery( this ).find( 'span[id^=mainwp]' );
            var spanId = /^mainwp-(.*)$/.exec( spanEl.attr( 'id' ) );
            if ( spanId ) {
                hidingSubMenuTimers[spanId[1]] = setTimeout( function ( span ) {
                    return function () {
                        subMenuOut( span );
                    };
                }( spanId[1] ), 30 );
            }
        } );
    } );
    jQuery( '.mainwp-submenu-wrapper' ).on( {
        mouseenter: function () {
            var spanId = /^menu-mainwp-(.*)$/.exec( jQuery( this ).attr( 'id' ) );
            if ( spanId ) {
                if ( hidingSubMenuTimers[spanId[1]] ) {
                    clearTimeout( hidingSubMenuTimers[spanId[1]] );
                }
            }
        },
        mouseleave: function () {
            var spanId = /^menu-mainwp-(.*)$/.exec( jQuery( this ).attr( 'id' ) );
            if ( spanId ) {
                hidingSubMenuTimers[spanId[1]] = setTimeout( function ( span ) {
                    return function () {
                        subMenuOut( span );
                    };
                }( spanId[1] ), 30 );
            }
        }
    } );
} );
subMenuIn = function ( subName ) {
    jQuery( '#menu-mainwp-' + subName ).show();
    jQuery( '#mainwp-' + subName ).parent().parent().addClass( 'hoverli' );
    jQuery( '#mainwp-' + subName ).parent().parent().css( 'background-color', '#EAF2FA' );
    jQuery( '#mainwp-' + subName ).css( 'color', '#333' );
};
subMenuOut = function ( subName ) {
    jQuery( '#menu-mainwp-' + subName ).hide();
    jQuery( '#mainwp-' + subName ).parent().parent().css( 'background-color', '' );
    jQuery( '#mainwp-' + subName ).parent().parent().removeClass( 'hoverli' );
    jQuery( '#mainwp-' + subName ).css( 'color', '' );
};


function shake_element( select ) {
    var pos = jQuery( select ).position();
    var type = jQuery( select ).css( 'position' );

  if ( type == 'static' ) {
        jQuery( select ).css( {
            position: 'relative'
        } );
    }

  if ( type == 'static' || type == 'relative' ) {
        pos.top = 0;
        pos.left = 0;
    }

    jQuery( select ).data( 'init-type', type );

    var shake = [ [ 0, 5, 60 ], [ 0, 0, 60 ], [ 0, -5, 60 ], [ 0, 0, 60 ], [ 0, 2, 30 ], [ 0, 0, 30 ], [ 0, -2, 30 ], [ 0, 0, 30 ] ];

    for ( s = 0; s < shake.length; s++ ) {
        jQuery( select ).animate( {
            top: pos.top + shake[s][0],
            left: pos.left + shake[s][1]
        }, shake[s][2], 'linear' );
    }
}


/**
 * Required
 */
feedback = function ( id, text, type, append ) {
  if ( append == true ) {
    var currentHtml = jQuery( '#' + id ).html();
    if ( currentHtml == null )
      currentHtml = "";
    if ( currentHtml != '' ) {
      currentHtml += '<br />' + text;
    } else {
      currentHtml = text;
    }
    jQuery( '#' + id ).html( currentHtml );
    jQuery( '#' + id ).addClass( type );
  } else {
    jQuery( '#' + id ).html( text );
    jQuery( '#' + id ).addClass( type );
  }
  jQuery( '#' + id ).show();

  // automatically scroll to error message if it's not visible
  var scrolltop = jQuery( window ).scrollTop();
  var off = jQuery( '#' + id ).offset();
  if ( scrolltop > off.top - 40 )
      jQuery('html, body').animate({
          scrollTop:off.top - 40
      }, 1000, function () {
      shake_element( '#' + id )
      });
  else
      shake_element('#' + id); // shake the error message to get attention :)
};

jQuery( document ).ready( function () {
    jQuery( 'div.mainwp-hidden' ).parent().parent().css( "display", "none" );
} );

/**
 * Security Issues
 */

var securityIssues_fixes = [ 'listing', 'wp_version', 'rsd', 'wlw', 'core_updates', 'plugin_updates', 'theme_updates', 'db_reporting', 'php_reporting', 'versions', 'registered_versions', 'admin', 'readme' ];
jQuery( document ).ready( function () {
  var securityIssueSite = jQuery( '#securityIssueSite' );
  if ( ( securityIssueSite.val() != null ) && ( securityIssueSite.val() != "" ) ) {
    jQuery( document ).on( 'click', '#securityIssues_fixAll', function () {
      securityIssues_fix( 'all' );
    } );

    jQuery( document ).on( 'click', '#securityIssues_refresh', function () {
      for ( var i = 0; i < securityIssues_fixes.length; i++ ) {
        var securityIssueCurrentIssue = jQuery( '#' + securityIssues_fixes[i] + '_fix' );
        if ( securityIssueCurrentIssue ) {
          securityIssueCurrentIssue.hide();
        }
        jQuery( '#' + securityIssues_fixes[i] + '_extra' ).hide();
        jQuery( '#' + securityIssues_fixes[i] + '_ok' ).hide();
        jQuery( '#' + securityIssues_fixes[i] + '_nok' ).hide();
        jQuery( '#' + securityIssues_fixes[i] + '_loading' ).show();
      }
      securityIssues_request( jQuery( '#securityIssueSite' ).val() );
    } );

    for ( var i = 0; i < securityIssues_fixes.length; i++ ) {
      jQuery( '#' + securityIssues_fixes[i] + '_fix' ).bind( 'click', function ( what ) {
        return function () {
          securityIssues_fix( what );
          return false;
        }
      }( securityIssues_fixes[i] ) );

      jQuery( '#' + securityIssues_fixes[i] + '_unfix' ).bind( 'click', function ( what ) {
        return function () {
          securityIssues_unfix( what );
          return false;
        }
      }( securityIssues_fixes[i] ) );
    }
    securityIssues_request( securityIssueSite.val() );
  }
} );
securityIssues_fix = function ( feature ) {
  if ( feature == 'all' ) {
    for ( var i = 0; i < securityIssues_fixes.length; i++ ) {
      if ( jQuery( '#' + securityIssues_fixes[i] + '_nok' ).css( 'display' ) != 'none' ) {
        if ( jQuery( '#' + securityIssues_fixes[i] + '_fix' ) ) {
          jQuery( '#' + securityIssues_fixes[i] + '_fix' ).hide();
        }
        jQuery( '#' + securityIssues_fixes[i] + '_extra' ).hide();
        jQuery( '#' + securityIssues_fixes[i] + '_ok' ).hide();
        jQuery( '#' + securityIssues_fixes[i] + '_nok' ).hide();
        jQuery( '#' + securityIssues_fixes[i] + '_loading' ).show();
      }
    }
  } else {
    if ( jQuery( '#' + feature + '_fix' ) ) {
      jQuery( '#' + feature + '_fix' ).hide();
    }
    jQuery( '#' + feature + '_extra' ).hide();
    jQuery( '#' + feature + '_ok' ).hide();
    jQuery( '#' + feature + '_nok' ).hide();
    jQuery( '#' + feature + '_loading' ).show();
  }

  var data = mainwp_secure_data( {
    action: 'mainwp_security_issues_fix',
    feature: feature,
    id: jQuery( '#securityIssueSite' ).val()
  } );

  jQuery.post( ajaxurl, data, function ( response ) {
    securityIssues_handle( response );
  }, 'json' );
};
var completedSecurityIssues = undefined;

// Securtiy issues Widget

// Show/Hide the list
jQuery( document ).on( 'click', '#show-security-issues-widget-list', function () {
  jQuery( '#mainwp-security-issues-widget-list' ).toggle();
  return false;
} );

// Fix all sites all security issues
jQuery( document ).on( 'click', '.fix-all-security-issues', function () {

  jQuery( '#mainwp-secuirty-issues-loader' ).show();

  jQuery( '#mainwp-security-issues-widget-list' ).show();

  var sites = jQuery( '#mainwp-security-issues-widget-list' ).find( '.item' );
  completedSecurityIssues = 0;
  for ( var i = 0; i < sites.length; i++ ) {
    var site = jQuery( sites[i] );
    completedSecurityIssues++;
    mainwp_fix_all_security_issues( site.attr( 'siteid' ), false );
  }
} );

// Fix all securtiy issues for a site
jQuery( document ).on( 'click', '.fix-all-site-security-issues', function () {
  jQuery( '#mainwp-secuirty-issues-loader' ).show();
  mainwp_fix_all_security_issues( jQuery( this ).closest( '.item' ).attr( 'siteid' ), true );
} );

mainwp_fix_all_security_issues = function ( siteId, refresh ) {
  var data = mainwp_secure_data( {
    action: 'mainwp_security_issues_fix',
    feature: 'all',
    id: siteId
  } );

  var el = jQuery( '#mainwp-security-issues-widget-list .item[siteid="' + siteId + '"] .fix-all-site-security-issues' );

  el.hide();

  jQuery( '.fix-all-site-security-issues' ).addClass( 'disabled' );
  jQuery( '.unfix-all-site-security-issues' ).addClass( 'disabled' );

  jQuery.post( ajaxurl, data, function ( pRefresh ) {
    return function () {
      el.show();
      if ( pRefresh || ( completedSecurityIssues != undefined && --completedSecurityIssues <= 0 ) ) {
        window.location.href = location.href;
      }
    }
  }( refresh, el ), 'json' );
};

jQuery( document ).on( 'click', '.unfix-all-site-security-issues', function () {

  jQuery( '#mainwp-secuirty-issues-loader' ).show();

  var data = mainwp_secure_data( {
    action: 'mainwp_security_issues_unfix',
    feature: 'all',
    id: jQuery( jQuery( this ).parents( '.item' )[0] ).attr( 'siteid' )
  } );

  jQuery( this ).hide();
  jQuery( '.fix-all-site-security-issues' ).addClass( 'disabled' );
  jQuery( '.unfix-all-site-security-issues' ).addClass( 'disabled' );

  jQuery.post( ajaxurl, data, function () {
    window.location.href = location.href;
  }, 'json' );
} );
securityIssues_unfix = function ( feature ) {
    if ( jQuery( '#' + feature + '_unfix' ) ) {
        jQuery( '#' + feature + '_unfix' ).hide();
    }
    jQuery( '#' + feature + '_extra' ).hide();
    jQuery( '#' + feature + '_ok' ).hide();
    jQuery( '#' + feature + '_nok' ).hide();
    jQuery( '#' + feature + '_loading' ).show();

    var data = mainwp_secure_data( {
        action: 'mainwp_security_issues_unfix',
        feature: feature,
        id: jQuery( '#securityIssueSite' ).val()
    } );
    jQuery.post( ajaxurl, data, function ( response ) {
        securityIssues_handle( response );
    }, 'json' );
};
securityIssues_request = function ( websiteId ) {
    var data = mainwp_secure_data( {
        action: 'mainwp_security_issues_request',
        id: websiteId
    } );
    jQuery.post( ajaxurl, data, function ( response ) {
        securityIssues_handle( response );
    }, 'json' );
};
securityIssues_handle = function ( response ) {
    var result = '';
    if ( response.error )
    {
        result = getErrorMessage( response.error );
    } else
    {
        try {
            var res = response.result;
            for ( var issue in res ) {
                if ( jQuery( '#' + issue + '_loading' ) ) {
                    jQuery( '#' + issue + '_loading' ).hide();
                    if ( res[issue] == 'Y' ) {
                        jQuery( '#' + issue + '_extra' ).hide();
                        jQuery( '#' + issue + '_nok' ).hide();
                        if ( jQuery( '#' + issue + '_fix' ) ) {
                            jQuery( '#' + issue + '_fix' ).hide();
                        }
                        if ( jQuery( '#' + issue + '_unfix' ) ) {
                            jQuery( '#' + issue + '_unfix' ).show();
                        }
                        jQuery( '#' + issue + '_ok' ).show();
                        jQuery( '#' + issue + '-status-ok' ).show();
                        jQuery( '#' + issue + '-status-nok' ).hide();
                        if (issue == 'readme') {
                            jQuery('#readme-wpe-nok').hide();
                        }
                    } else {
                        jQuery( '#' + issue + '_extra' ).hide();
                        jQuery( '#' + issue + '_ok' ).hide();
                        jQuery( '#' + issue + '_nok' ).show();
                        if ( jQuery( '#' + issue + '_fix' ) ) {
                            jQuery( '#' + issue + '_fix' ).show();
                        }
                        if ( jQuery( '#' + issue + '_unfix' ) ) {
                            jQuery( '#' + issue + '_unfix' ).hide();
                        }

                        if ( res[issue] != 'N' ) {
                            jQuery( '#' + issue + '_extra' ).html( res[issue] );
                            jQuery( '#' + issue + '_extra' ).show();
                        }
                    }
                }
            }
        } catch ( err ) {
            result = '<i class="exclamation circle icon"></i> ' + __( 'Undefined error!' );
        }
    }
    if ( result != '' ) {
        //show error!
    }
};

/**
 * Sync Sites
 */

jQuery( document ).ready( function () {
    jQuery( '#mainwp-sync-sites' ).on( 'click', function () {
      mainwp_sync_sites_data();
    } );

    // to compatible with extensions
    jQuery('#dashboard_refresh').on('click', function () {
        mainwp_sync_sites_data();
    });
});

mainwp_sync_sites_data = function ( syncSiteIds ) {
  var allWebsiteIds = jQuery( '.dashboard_wp_id' ).map( function ( indx, el ) {
    return jQuery( el ).val();
  } );
  var globalSync = true;
  var selectedIds = [ ], excludeIds = [ ];
  if ( syncSiteIds instanceof Array ) {
    jQuery.grep( allWebsiteIds, function ( el ) {
      if ( jQuery.inArray( el, syncSiteIds ) !== -1 ) {
        selectedIds.push( el );
      } else {
        excludeIds.push( el );
      }
    } );
    for ( var i = 0; i < excludeIds.length; i++ ){
      dashboard_update_site_hide( excludeIds[i] );
    }
    allWebsiteIds = selectedIds;
    globalSync = false;
  }

  for ( var i = 0; i < allWebsiteIds.length; i++ ){
    dashboard_update_site_status( allWebsiteIds[i], '<i class="clock outline icon"></i>' );
  }

  var nrOfWebsites = allWebsiteIds.length;

  mainwpPopup( '#mainwp-sync-sites-modal' ).init( {
    title: __( 'Data Synchronization' ),
    total: allWebsiteIds.length,
    pMax: nrOfWebsites,
    callback: function () {
      bulkTaskRunning = false;
      history.pushState("", document.title, window.location.pathname + window.location.search); // to fix issue for url with hash
      window.location.href = location.href;
  } } );

  dashboard_update(allWebsiteIds, globalSync);

    if ( nrOfWebsites > 0) {
        var data = {
            action:'mainwp_status_saving',
            status: 'last_sync_sites',
            isGlobalSync: globalSync
        };
        jQuery.post(ajaxurl, mainwp_secure_data(data), function () {

        });
    }

};

var websitesToUpdate = [ ];
var websitesTotal = 0;
var websitesLeft = 0;
var websitesDone = 0;
var currentWebsite = 0;
var bulkTaskRunning = false;
var currentThreads = 0;
var maxThreads = mainwpParams['maximumSyncRequests'] == undefined ? 8 : mainwpParams['maximumSyncRequests'];
var globalSync = true;

dashboard_update = function ( websiteIds, isGlobalSync) {
  websitesToUpdate = websiteIds;
  currentWebsite = 0;
  websitesDone = 0;
  websitesTotal = websitesLeft = websitesToUpdate.length;
  globalSync = isGlobalSync;

  bulkTaskRunning = true;

  if ( websitesTotal == 0 ) {
    dashboard_update_done();
  } else {
    dashboard_loop_next();
  }
};

dashboard_update_site_status = function ( siteId, newStatus, isSuccess ) {
  jQuery( '.sync-site-status[siteid="' + siteId + '"]' ).html( newStatus );
  // Move successfully synced site to the bottom of the sync list
  if ( typeof isSuccess !== 'undefined' && isSuccess ) {
    var row = jQuery( '.sync-site-status[siteid="' + siteId + '"]' ).closest( '.item' );
    jQuery( row ).insertAfter( jQuery( "#sync-sites-status .item" ).not( '.disconnected-site' ).last() );
  }
};

dashboard_update_site_hide = function ( siteId ) {
  jQuery( '.sync-site-status[siteid="' + siteId + '"]' ).closest( '.item' ).hide();
};

dashboard_loop_next = function () {
  while ( bulkTaskRunning && ( currentThreads < maxThreads ) && ( websitesLeft > 0 ) ) {
    dashboard_update_next();
  }
};

dashboard_update_done = function () {
  currentThreads--;
  if ( !bulkTaskRunning )
    return;
  websitesDone++;
  if ( websitesDone > websitesTotal )
    websitesDone = websitesTotal;

  mainwpPopup( '#mainwp-sync-sites-modal' ).setProgressValue( websitesDone );

  if ( websitesDone == websitesTotal ) {
    setTimeout( function () {
      bulkTaskRunning = false;
      mainwpPopup( '#mainwp-sync-sites-modal' ).close(true);
    }, 3000 );
    return;
  }

  dashboard_loop_next();
};

dashboard_update_next = function () {
  currentThreads++;
  websitesLeft--;
  var websiteId = websitesToUpdate[currentWebsite++];
  dashboard_update_site_status( websiteId, '<i class="sync alternate loading icon"></i>' );
  var data = mainwp_secure_data( {
    action: 'mainwp_syncsites',
    wp_id: websiteId,
    isGlobalSync: globalSync
  } );
  dashboard_update_next_int( websiteId, data, 0 );
};

dashboard_update_next_int = function ( websiteId, data, errors ) {
  jQuery.ajax( {
    type: 'POST',
    url: ajaxurl,
    data: data,
    success: function ( pWebsiteId ) {
      return function ( response ) {
        if ( response.error ) {
          dashboard_update_site_status( pWebsiteId, '<i class="exclamation red icon"></i>' );
        } else {
          dashboard_update_site_status( websiteId, '<i class="check green icon"></i>', true );
        }
          dashboard_update_done();
        }
    }( websiteId ),
    error: function ( pWebsiteId, pData, pErrors ) {
      return function () {
        if ( pErrors > 5 ) {
          dashboard_update_site_status( pWebsiteId, '<i class="exclamation yellow icon"></i>' );
          dashboard_update_done();
        } else {
          pErrors++;
          dashboard_update_next_int( pWebsiteId, pData, pErrors );
        }
      }
    }( websiteId, data, errors ),
    dataType: 'json'
  } );
};


mainwp_tool_disconnect_sites = function () {

  var allWebsiteIds = jQuery( '.dashboard_wp_id' ).map( function ( indx, el ) {
    return jQuery( el ).val();
  } );

  for ( var i = 0; i < allWebsiteIds.length; i++ ){
    dashboard_update_site_status( allWebsiteIds[i], '<i class="clock outline icon"></i>' );
  }

  var nrOfWebsites = allWebsiteIds.length;

  mainwpPopup( '#mainwp-sync-sites-modal' ).init( {
    title: __( 'Disconnect All Sites' ),
    total: allWebsiteIds.length,
    pMax: nrOfWebsites,
    statusText: __( 'disconnected' ),
    callback: function () {
      window.location.href = location.href;
  } } );

  websitesToUpdate = allWebsiteIds;
  currentWebsite = 0;
  websitesDone = 0;
  websitesTotal = websitesLeft = websitesToUpdate.length;

  bulkTaskRunning = true;

  if ( websitesTotal == 0 ) {
    mainwp_tool_disconnect_sites_done();
  } else {
    mainwp_tool_disconnect_sites_loop_next();
  }
};

mainwp_tool_disconnect_sites_done = function () {
  currentThreads--;
  if ( !bulkTaskRunning )
    return;
  websitesDone++;
  if ( websitesDone > websitesTotal )
    websitesDone = websitesTotal;

  mainwpPopup( '#mainwp-sync-sites-modal' ).setProgressValue( websitesDone );

  mainwp_tool_disconnect_sites_loop_next();
};

mainwp_tool_disconnect_sites_loop_next = function () {
  while ( bulkTaskRunning && ( currentThreads < maxThreads ) && ( websitesLeft > 0 ) ) {
    mainwp_tool_disconnect_sites_next();
  }
};

mainwp_tool_disconnect_sites_next = function () {
  currentThreads++;
  websitesLeft--;
  var websiteId = websitesToUpdate[currentWebsite++];
  dashboard_update_site_status( websiteId, '<i class="sync alternate loading icon"></i>' );
  var data = mainwp_secure_data( {
    action: 'mainwp_disconnect_site',
    wp_id: websiteId
  } );
  mainwp_tool_disconnect_sites_next_int( websiteId, data, 0 );
};

mainwp_tool_disconnect_sites_next_int = function ( websiteId, data, errors ) {
  jQuery.ajax( {
    type: 'POST',
    url: ajaxurl,
    data: data,
    success: function ( pWebsiteId ) {
      return function ( response ) {
            if ( response && response.error ) {
              dashboard_update_site_status( pWebsiteId, response.error + '<i class="exclamation red icon"></i>' );
            } else if (response && response.result == 'success') {
              dashboard_update_site_status( websiteId, '<i class="check green icon"></i>', true );
            } else {
                dashboard_update_site_status( pWebsiteId, __( 'Undefined error!' ) + ' <i class="exclamation red icon"></i>' );
            }
            mainwp_tool_disconnect_sites_done();
        }
    }( websiteId ),
    error: function ( pWebsiteId, pData, pErrors ) {
      return function () {
        if ( pErrors > 5 ) {
          dashboard_update_site_status( pWebsiteId, '<i class="exclamation yellow icon"></i>' );
          mainwp_tool_disconnect_sites_done();
        } else {
          pErrors++;
          mainwp_tool_disconnect_sites_next_int( pWebsiteId, pData, pErrors );
        }
      }
    }( websiteId, data, errors ),
    dataType: 'json'
  } );
};


/**
 * Manage sites page
 */

jQuery( document ).ready( function () {
    jQuery( '#mainwp-backup-type' ).change( function () {
        if (jQuery(this).val() == 'full')
            jQuery( '.mainwp-backup-full-exclude' ).show();
        else
            jQuery( '.mainwp-backup-full-exclude' ).hide();
    } );
});


jQuery( document ).ready( function () {
    jQuery(document).on('change', '#mainwp_managesites_add_wpurl', function() {
        var url = jQuery( '#mainwp_managesites_add_wpurl' ).val();
        var protocol = jQuery( '#mainwp_managesites_add_wpurl_protocol' ).val();
        if ( url.lastIndexOf( 'http://' ) === 0 ) {
            protocol = 'http';
            url = url.substring( 7 );
        } else if ( url.lastIndexOf( 'https://' ) === 0 ) {
            protocol = 'https';
            url = url.substring( 8 );
        }
        if ( jQuery( '#mainwp_managesites_add_wpname' ).val() == '' ) {
            jQuery( '#mainwp_managesites_add_wpname' ).val( url );
        }
        jQuery( '#mainwp_managesites_add_wpurl' ).val( url );
        jQuery( '#mainwp_managesites_add_wpurl_protocol' ).val( protocol ).trigger( "change" );
    } );

    // Trigger the single site reconnect process
    jQuery('#mainwp-manage-sites-table').on( 'click', '.mainwp_site_reconnect', function () {
      mainwp_managesites_reconnect( jQuery( this ) );
      return false;
    } );

    jQuery( '.mainwp-updates-overview-reconnect-site' ).on( 'click', function () {
        mainwp_overview_reconnect( jQuery( this ) );
        return false;
    } );

    jQuery( ".chk-sync-install-plugin" ).change( function () {
        var parent = jQuery( this ).closest( '.sync-ext-row' );
        var opts = parent.find( ".sync-options input[type='checkbox']" );
        if ( jQuery( this ).is( ':checked' ) ) {
            //opts.removeAttr( "disabled" );
            opts.prop( "checked", true );
        } else {
            opts.prop( "checked", false );
            ///opts.attr( "disabled", "disabled" );
        }
    } );

    managesites_init();
} );

managesites_init = function () {
    jQuery( '#mainwp-message-zone' ).hide();
    jQuery( '.sync-ext-row span.status' ).html( '' );
    jQuery( '.sync-ext-row span.status' ).css( 'color', '#0073aa' );

    managesites_bulk_init();

};

mainwp_overview_reconnect = function ( pElement ) {
    var wrapElement = pElement.closest('.mainwp_wp_sync');
    var parent = pElement.parent();
    parent.html( '<i class="notched circle loading icon"></i> ' + 'Trying to reconnect. Please wait...' );

    var data = mainwp_secure_data( {
        action: 'mainwp_reconnectwp',
        siteid: wrapElement.attr( 'site_id' )
    } );

    jQuery.post( ajaxurl, data, function () {
        return function ( response ) {
            parent.hide();
            response = jQuery.trim( response );
            console.log(response);
            if ( response.substr( 0, 5 ) == 'ERROR' ) {
                var error;
                if ( response.length == 5 ) {
                  error = 'Undefined error! Please try again. If the process keeps failing, please contact the MainWP support.';
                } else {
                  error = response.substr( 6 );
                }
                feedback( 'mainwp-message-zone', error, 'red' );
            } else {
                location.reload();
            }
        }
    }());
};

mainwp_managesites_reconnect = function ( pElement ) {
  var wrapElement = pElement.closest('tr');
  wrapElement.html( '<td colspan="999"><i class="notched circle loading icon"></i> ' + 'Trying to reconnect. Please wait...' + '</td>' );
  var data = mainwp_secure_data( {
    action: 'mainwp_reconnectwp',
    siteid: wrapElement.attr( 'siteid' )
  } );

  jQuery.post( ajaxurl, data, function ( pWrapElement ) {
    return function ( response ) {
      response = jQuery.trim( response );
      pWrapElement.hide(); // hide reconnect item
      if ( response.substr( 0, 5 ) == 'ERROR' ) {
        var error;
        if ( response.length == 5 ) {
          error = 'Undefined error! Please try again. If the process keeps failing, please contact the MainWP support.';
        } else {
          error = response.substr( 6 );
        }
        feedback( 'mainwp-message-zone', error, 'red' );
      } else {
        feedback( 'mainwp-message-zone', response, 'green' );
      }
      setTimeout( function () {
        window.location.reload()
      }, 6000 );
    }

  }( wrapElement ) );
};

// Connect a new website
mainwp_managesites_add = function () {
    managesites_init();

    var errors = [ ];

    if ( jQuery( '#mainwp_managesites_add_wpname' ).val() == '' ) {
      errors.push( __( 'Please enter a name for the website.' ) );
    }
    if ( jQuery( '#mainwp_managesites_add_wpurl' ).val() == '' ) {
      errors.push( __( 'Please enter a valid URL for your site.' ) );
    } else {
      var url = jQuery( '#mainwp_managesites_add_wpurl' ).val();
      if ( url.substr( -1 ) != '/' ) {
        url += '/';
      }

      jQuery( '#mainwp_managesites_add_wpurl' ).val( url );

      if ( !isUrl( jQuery( '#mainwp_managesites_add_wpurl_protocol' ).val() + '://' + jQuery( '#mainwp_managesites_add_wpurl' ).val() ) ) {
        errors.push( __( 'Please enter a valid URL for your site.' ) );
      }
    }
    if ( jQuery( '#mainwp_managesites_add_wpadmin' ).val() == '' ) {
      errors.push( __( 'Please enter a username of the website administrator.' ) );
    }

    if ( errors.length > 0 ) {
      feedback( 'mainwp-message-zone', errors.join( '<br />' ), 'yellow' );
    } else {
      feedback( 'mainwp-message-zone', __( 'Adding the site to your MainWP Dashboard. Please wait...' ), 'green' );

      jQuery( '#mainwp_managesites_add' ).attr( 'disabled', 'true' ); //disable button to add..

      //Check if valid user & rulewp is installed?
      var url = jQuery( '#mainwp_managesites_add_wpurl_protocol' ).val() + '://' + jQuery( '#mainwp_managesites_add_wpurl' ).val();
      if ( url.substr( -1 ) != '/' ) {
          url += '/';
      }

      var name = jQuery( '#mainwp_managesites_add_wpname' ).val();
          name = name.replace( /"/g, '&quot;' );

      var data = mainwp_secure_data( {
        action: 'mainwp_checkwp',
        name: name,
        url: url,
        admin: jQuery( '#mainwp_managesites_add_wpadmin' ).val(),
        verify_certificate: jQuery( '#mainwp_managesites_verify_certificate' ).val(),
        force_use_ipv4: jQuery( '#mainwp_managesites_force_use_ipv4' ).val(),
        ssl_version: jQuery( '#mainwp_managesites_ssl_version' ).val(),
        http_user: jQuery( '#mainwp_managesites_add_http_user' ).val(),
        http_pass: jQuery( '#mainwp_managesites_add_http_pass' ).val()
      } );

      jQuery.post( ajaxurl, data, function ( res_things ) {
        response = res_things.response;
        response = jQuery.trim( response );

        var url = jQuery( '#mainwp_managesites_add_wpurl_protocol' ).val() + '://' + jQuery( '#mainwp_managesites_add_wpurl' ).val();
        if ( url.substr( -1 ) != '/' ) {
          url += '/';
        }

        url = url.replace( /"/g, '&quot;' );

        if ( response == 'HTTPERROR' ) {
          errors.push( __( 'This site can not be reached! Please use the Test Connection feature and see if the positive response will be returned. For additional help, contact the MainWP Support.' ) );
        } else if ( response == 'NOMAINWP' ) {
          errors.push( __( 'MainWP Child Plugin not detected! Please make sure that the MainWP Child plugin is installed and activated on the child site. For additional help, contact the MainWP Support.' ) );
        } else if ( response.substr( 0, 5 ) == 'ERROR' ) {
          if ( response.length == 5 ) {
            errors.push( __( 'Undefined error occurred. Please try again. If the issue does not resolve, please contact the MainWP Support.' ) );
          } else {
            errors.push( __( 'Error detected: ' ) + response.substr( 6 ) );
          }
        } else if ( response == 'OK' ) {
			jQuery( '#mainwp_managesites_add' ).attr( 'disabled', 'true' ); //Disable add button

			var name = jQuery( '#mainwp_managesites_add_wpname' ).val();
			name = name.replace( /"/g, '&quot;' );
			var group_ids = jQuery( '#mainwp_managesites_add_addgroups' ).dropdown('get value');
			var data = mainwp_secure_data( {
			  action: 'mainwp_addwp',
			  managesites_add_wpname: name,
			  managesites_add_wpurl: url,
			  managesites_add_wpadmin: jQuery( '#mainwp_managesites_add_wpadmin' ).val(),
			  managesites_add_uniqueId: jQuery( '#mainwp_managesites_add_uniqueId' ).val(),
			  groupids: group_ids,
			  verify_certificate: jQuery( '#mainwp_managesites_verify_certificate' ).val(),
			  force_use_ipv4: jQuery( '#mainwp_managesites_force_use_ipv4' ).val(),
			  ssl_version: jQuery( '#mainwp_managesites_ssl_version' ).val(),
			  managesites_add_http_user: jQuery( '#mainwp_managesites_add_http_user' ).val(),
			  managesites_add_http_pass: jQuery( '#mainwp_managesites_add_http_pass' ).val(),
			} );

			// to support add client reports tokens values
			jQuery( "input[name^='creport_token_']" ).each( function(){
			  var tname = jQuery( this ).attr( 'name' );
			  var tvalue = jQuery( this ).val();
			  data[tname] = tvalue;
			} );

			// support hooks fields
			jQuery( ".mainwp_addition_fields_addsite input" ).each( function() {
				var tname = jQuery( this ).attr( 'name' );
				var tvalue = jQuery( this ).val();
				data[tname] = tvalue;
			} );

			jQuery.post( ajaxurl, data, function ( res_things ) {
			  var site_id = 0;
			  if ( res_things.error ) {
				response = 'Error detected: ' + res_things.error;
			  } else {
				response = res_things.response;
				site_id = res_things.siteid;
			  }
			  response = jQuery.trim( response );
			  managesites_init();

			  if ( response.substr( 0, 5 ) == 'ERROR' ) {
				jQuery( '#mainwp-message-zone' ).removeClass( 'green' );
				feedback( 'mainwp-message-zone', response.substr( 6 ), 'red' );
			  } else {
					  //Message the WP was added
					  jQuery( '#mainwp-message-zone' ).removeClass( 'red' );
					  feedback( 'mainwp-message-zone', response, 'green' );

					  if ( site_id > 0 ) {
						jQuery( '.sync-ext-row' ).attr( 'status', 'queue' );
						setTimeout( function () {
						  mainwp_managesites_sync_extension_start_next( site_id );
						}, 1000 );
					  }

					  //Reset fields
					  jQuery( '#mainwp_managesites_add_wpname' ).val( '' );
					  jQuery( '#mainwp_managesites_add_wpurl' ).val( '' );
					  jQuery( '#mainwp_managesites_add_wpurl_protocol' ).val( 'https' );
					  jQuery( '#mainwp_managesites_add_wpadmin' ).val( '' );
					  jQuery( '#mainwp_managesites_add_uniqueId' ).val( '' );
					  jQuery( '#mainwp_managesites_add_addgroups').dropdown('clear');
					  jQuery( '#mainwp_managesites_verify_certificate' ).val( 1 );
					  jQuery( '#mainwp_managesites_force_use_ipv4' ).val( 0 );
					  jQuery( '#mainwp_managesites_ssl_version' ).val( 'auto' );

					  jQuery( "input[name^='creport_token_']" ).each(function(){
						jQuery( this ).val( '' );
					  } );

					  // support hooks fields
					  jQuery( ".mainwp_addition_fields_addsite input" ).each( function() {
						jQuery( this ).val('');
					  } );
				}

				jQuery( '#mainwp_managesites_add' ).removeAttr( 'disabled' ); //Enable add button
				}, 'json' );
            }
            if ( errors.length > 0 ) {
              jQuery( '#mainwp-message-zone' ).removeClass( 'green' );
              managesites_init();
              jQuery( '#mainwp_managesites_add' ).removeAttr( 'disabled' ); //Enable add button
              feedback( 'mainwp-message-zone', errors.join( '<br />' ), 'red' );
            }
        }, 'json' );
    }
};

mainwp_managesites_sync_extension_start_next = function ( siteId ) {
    while ( ( pluginToInstall = jQuery( '.sync-ext-row[status="queue"]:first' ) ) && ( pluginToInstall.length > 0 ) && ( bulkInstallCurrentThreads <  1 /* bulkInstallMaxThreads // to fix install plugins and apply settings failed issue */ ))
    {
        mainwp_managesites_sync_extension_start_specific( pluginToInstall, siteId );
    }

    if ( ( pluginToInstall.length == 0 ) && ( bulkInstallCurrentThreads == 0 ) )
    {
        jQuery( '#mwp_applying_ext_settings' ).remove();
    }
};

mainwp_managesites_sync_extension_start_specific = function ( pPluginToInstall, pSiteId ) {
    pPluginToInstall.attr( 'status', 'progress' );
    var syncGlobalSettings = pPluginToInstall.find( ".sync-global-options input[type='checkbox']:checked" ).length > 0 ? true : false;
    var install_plugin = pPluginToInstall.find( ".sync-install-plugin input[type='checkbox']:checked" ).length > 0 ? true : false;
    var apply_settings = pPluginToInstall.find( ".sync-options input[type='checkbox']:checked" ).length > 0 ? true : false;

    if ( syncGlobalSettings ) {
        mainwp_extension_apply_plugin_settings( pPluginToInstall, pSiteId, true );
    } else if ( install_plugin ) {
        mainwp_extension_prepareinstallplugin( pPluginToInstall, pSiteId );
    } else if ( apply_settings ) {
        mainwp_extension_apply_plugin_settings( pPluginToInstall, pSiteId, false );
    } else {
        mainwp_managesites_sync_extension_start_next( pSiteId );
        return;
    }
};

mainwp_extension_prepareinstallplugin = function ( pPluginToInstall, pSiteId ) {
    var site_Ids = [ ];
    site_Ids.push( pSiteId );
    bulkInstallCurrentThreads++;
    var plugin_slug = pPluginToInstall.find( ".sync-install-plugin" ).attr( 'slug' );
    var workingEl = pPluginToInstall.find( ".sync-install-plugin i" );
    var statusEl = pPluginToInstall.find( ".sync-install-plugin span.status" );

    var data = {
        action: 'mainwp_ext_prepareinstallplugintheme',
        type: 'plugin',
        slug: plugin_slug,
        'selected_sites[]': site_Ids,
        selected_by: 'site',
    };

    workingEl.show();
    statusEl.html( __( 'Preparing for installation...' ) );

    jQuery.post( ajaxurl, data, function ( response ) {
        workingEl.hide();
        if ( response.sites && response.sites[pSiteId] ) {
            statusEl.html( __( 'Installing...' ) );
            var data = mainwp_secure_data( {
                action: 'mainwp_ext_performinstallplugintheme',
                type: 'plugin',
                url: response.url,
                siteId: pSiteId,
                activatePlugin: true,
                overwrite: false,
            } );
            workingEl.show();
            jQuery.post( ajaxurl, data, function ( response ) {
                workingEl.hide();
                var apply_settings = false;
                var syc_msg = '';
                var _success = false;
                if ( ( response.ok != undefined ) && ( response.ok[pSiteId] != undefined ) ) {
                    syc_msg = __( 'Installation successful!' );
                    statusEl.html( syc_msg );
                    apply_settings = pPluginToInstall.find( ".sync-options input[type='checkbox']:checked" ).length > 0 ? true : false;
                    if ( apply_settings ) {
                        mainwp_extension_apply_plugin_settings( pPluginToInstall, pSiteId, false );
                    }
                    _success = true;
                } else if ( ( response.errors != undefined ) && ( response.errors[pSiteId] != undefined ) ) {
                    syc_msg = __( 'Installation failed!' ) + ': ' + response.errors[pSiteId][1];
                    statusEl.html( syc_msg );
                    statusEl.css( 'color', 'red' );
                } else {
                    syc_msg = __( 'Installation failed!' );
                    statusEl.html( syc_msg );
                    statusEl.css( 'color', 'red' );
                }

                if ( syc_msg != '' ) {
                    if ( _success )
                        syc_msg = '<span style="color:#0073aa">' + syc_msg + '!</span>';
                    else
                        syc_msg = '<span style="color:red">' + syc_msg + '!</span>';
                    jQuery( '#mainwp-message-zone' ).append( pPluginToInstall.find( ".sync-install-plugin" ).attr( 'plugin_name' ) + ' ' + syc_msg + '<br/>' );
                }

                if ( !apply_settings ) {
                    bulkInstallCurrentThreads--;
                    mainwp_managesites_sync_extension_start_next( pSiteId );
                }
            }, 'json' );
        } else {
            statusEl.css( 'color', 'red' );
            statusEl.html( __( 'Error while preparing the installation. Please, try again.' ) );
            bulkInstallCurrentThreads--;
        }
    }, 'json' );
}

mainwp_extension_apply_plugin_settings = function ( pPluginToInstall, pSiteId, pGlobal ) {
    var extSlug = pPluginToInstall.attr( 'slug' );
    var workingEl = pPluginToInstall.find( ".options-row i" );
    var statusEl = pPluginToInstall.find( ".options-row span.status" );
    if ( pGlobal )
        bulkInstallCurrentThreads++;

    var data = mainwp_secure_data( {
        action: 'mainwp_ext_applypluginsettings',
        ext_dir_slug: extSlug,
        siteId: pSiteId
    } );

    workingEl.show();
    statusEl.html( __( 'Applying settings...' ) );
    jQuery.post( ajaxurl, data, function ( response ) {
        workingEl.hide();
        var syc_msg = '';
        var _success = false;
        if ( response ) {
            if ( response.result && response.result == 'success' ) {
                var msg = '';
                if ( response.message != undefined ) {
                    msg = ' ' + response.message;
                }
                statusEl.html( __( 'Applying settings successful!' ) + msg );
                syc_msg = __( 'Successful' );
                _success = true
            } else if ( response.error != undefined ) {
                statusEl.html( __( 'Applying settings failed!' ) + ': ' + response.error );
                statusEl.css( 'color', 'red' );
                syc_msg = __( 'failed' );
            } else {
                statusEl.html( __( 'Applying settings failed!' ) );
                statusEl.css( 'color', 'red' );
                syc_msg = __( 'failed' );
            }
        } else {
            statusEl.html( __( 'Undefined error!' ) );
            statusEl.css( 'color', 'red' );
            syc_msg = __( 'failed' );
        }

        if ( syc_msg != '' ) {
            if ( _success )
                syc_msg = '<span style="color:#0073aa">' + syc_msg + '!</span>';
            else
                syc_msg = '<span style="color:red">' + syc_msg + '!</span>';
            if ( pGlobal ) {
                syc_msg = __( 'Apply global %1 options', pPluginToInstall.attr( 'ext_name' ) ) + ' ' + syc_msg + '<br/>';
            } else {
                syc_msg = __( 'Apply %1 settings', pPluginToInstall.find( '.sync-install-plugin' ).attr( 'plugin_name' ) ) + ' ' + syc_msg + '<br/>';
            }
            jQuery( '#mainwp-message-zone' ).append( syc_msg );
        }
        bulkInstallCurrentThreads--;
        mainwp_managesites_sync_extension_start_next( pSiteId );
    }, 'json' );
}

// Test Connection
mainwp_managesites_test = function () {
    var errors = [ ];

    if ( jQuery( '#mainwp_managesites_add_wpurl' ).val() == '' ) {
      errors.push( __( 'Please enter a valid URL for your site.' ) );
    } else {
      var clean_url = jQuery( '#mainwp_managesites_add_wpurl' ).val();
      var protocol = jQuery( '#mainwp_managesites_add_wpurl_protocol' ).val();

      url = protocol + '://' + clean_url;

      if ( url.substr( -1 ) != '/' ) {
        url += '/';
      }

      if ( !isUrl( url ) ) {
        errors.push( __( 'Please enter a valid URL for your site' ) );
      }
    }

    if ( errors.length > 0 ) {
      feedback( 'mainwp-message-zone', errors.join( '<br />' ), 'red' );
    } else {
      jQuery( '#mainwp-test-connection-modal' ).modal( 'show' );
      jQuery( '#mainwp-test-connection-modal .dimmer' ).show();
      jQuery( '#mainwp-test-connection-modal .content #mainwp-test-connection-result' ).hide();

      var clean_url = jQuery( '#mainwp_managesites_add_wpurl' ).val();
      var protocol = jQuery( '#mainwp_managesites_add_wpurl_protocol' ).val();

      url = protocol + '://' + clean_url;

      if ( url.substr( -1 ) != '/' ) {
        url += '/';
      }

      var data = mainwp_secure_data( {
        action: 'mainwp_testwp',
        url: url,
        test_verify_cert: jQuery( '#mainwp_managesites_verify_certificate' ).val(),
        test_force_use_ipv4: jQuery( '#mainwp_managesites_force_use_ipv4' ).val(),
        test_ssl_version: jQuery( '#mainwp_managesites_ssl_version' ).val(),
        http_user: jQuery( '#mainwp_managesites_add_http_user' ).val(),
        http_pass: jQuery( '#mainwp_managesites_add_http_pass' ).val()
      } );

      jQuery.post( ajaxurl, data, function ( response ) {
        jQuery( '#mainwp-test-connection-modal .dimmer' ).hide();
        jQuery( '#mainwp-test-connection-modal .content #mainwp-test-connection-result i' ).removeClass( 'red green check times' );
        jQuery( '#mainwp-test-connection-modal .content #mainwp-test-connection-result .content span' ).html( '' );
        jQuery( '#mainwp-test-connection-modal .content #mainwp-test-connection-result .content .sub.header' ).html( '' );
        if ( response.error ) {
          if ( response.httpCode ) {
            jQuery( '#mainwp-test-connection-modal .content #mainwp-test-connection-result' ).show();
            jQuery( '#mainwp-test-connection-modal .content #mainwp-test-connection-result i' ).addClass( 'red times' );
            jQuery( '#mainwp-test-connection-modal .content #mainwp-test-connection-result .content span' ).html( __( 'Connection failed!' ) );
            jQuery( '#mainwp-test-connection-modal .content #mainwp-test-connection-result .content .sub.header' ).html( __( 'URL:' ) + ' ' + response.host + ' - ' + __( 'HTTP-code:' ) + ' ' + response.httpCode + ( response.httpCodeString ? ' (' + response.httpCodeString + ')' : '' ) + ' - ' + __( 'Error message: ' ) + ' ' + response.error );
          } else {
            jQuery( '#mainwp-test-connection-modal .content #mainwp-test-connection-result' ).show();
            jQuery( '#mainwp-test-connection-modal .content #mainwp-test-connection-result i' ).addClass( 'red times' );
            jQuery( '#mainwp-test-connection-modal .content #mainwp-test-connection-result .content span' ).html( __( 'Connection test failed.' ) );
            jQuery( '#mainwp-test-connection-modal .content #mainwp-test-connection-result .content .sub.header' ).html( __( 'Error message:' ) + ' ' + response.error );
          }
        } else if ( response.httpCode ) {
          if ( response.httpCode == '200' ) {
            jQuery( '#mainwp-test-connection-modal .content #mainwp-test-connection-result' ).show();
            jQuery( '#mainwp-test-connection-modal .content #mainwp-test-connection-result i' ).addClass( 'green check' );
            jQuery( '#mainwp-test-connection-modal .content #mainwp-test-connection-result .content span' ).html( __( 'Connection successful!' ) );
            jQuery( '#mainwp-test-connection-modal .content #mainwp-test-connection-result .content .sub.header' ).html( __( 'URL:' ) + ' ' + response.host + ( response.ip != undefined ? ' (IP: ' + response.ip + ')' : '' ) + ' - ' + __( 'Received HTTP-code' ) + ' ' + response.httpCode + ( response.httpCodeString ? ' (' + response.httpCodeString + ')' : '' ) );
          } else {
            jQuery( '#mainwp-test-connection-modal .content #mainwp-test-connection-result' ).show();
            jQuery( '#mainwp-test-connection-modal .content #mainwp-test-connection-result i' ).addClass( 'red times' );
            jQuery( '#mainwp-test-connection-modal .content #mainwp-test-connection-result .content span' ).html( __( 'Connection test failed.' ) );
            jQuery( '#mainwp-test-connection-modal .content #mainwp-test-connection-result .content .sub.header' ).html( __( 'URL:' ) + ' ' + response.host + ( response.ip != undefined ? ' (IP: ' + response.ip + ')' : '' ) + ' - ' + __( 'Received HTTP-code:' ) + ' ' + response.httpCode + ( response.httpCodeString ? ' (' + response.httpCodeString + ')' : '' ) );
          }
        } else {
          jQuery( '#mainwp-test-connection-modal .content #mainwp-test-connection-result' ).show( '' );
          jQuery( '#mainwp-test-connection-modal .content #mainwp-test-connection-result i' ).addClass( 'red times' );
          jQuery( '#mainwp-test-connection-modal .content #mainwp-test-connection-result .content span' ).html( __( 'Connection test failed.' ) );
          jQuery( '#mainwp-test-connection-modal .content #mainwp-test-connection-result .content .sub.header' ).html( __( 'Invalid response from the server, please try again.' ) );
        }
      }, 'json' );
    }
};
managesites_remove = function ( id ) {
  managesites_init();

  var msg = __( 'Are you sure you want to remove this site from your MainWP Dashboard?' );

  mainwp_confirm( msg, function() {
    jQuery( 'tr#child-site-' + id ).html( '<td colspan="999"><i class="notched circle loading icon"></i> ' + 'Removing and deactivating the MainWP Child plugin! Please wait...' + '</td>' );
    var data = mainwp_secure_data( {
      action: 'mainwp_removesite',
      id: id
    } );

    jQuery.post( ajaxurl, data, function ( response ) {

      managesites_init();

      var result = '';
      var error = '';

      if ( response.error != undefined ) {
        error = response.error;
      } else if ( response.result == 'SUCCESS' ) {
        result = '<i class="close icon"></i>' + __( 'The site has been removed and the MainWP Child plugin has been disabled.' );
      } else if ( response.result == 'NOSITE' ) {
        error = '<i class="close icon"></i>' + __( 'The requested site has not been found.' );
      } else {
        result = '<i class="close icon"></i>' + __( 'The site has been removed but the MainWP Child plugin could not be disabled. Please deactive the MainWP Child plugin manually!' );
      }

      if ( error != '' ) {
        feedback( 'mainwp-message-zone', error, 'red' );
      }

      if ( result != '' ) {
        feedback( 'mainwp-message-zone', result, 'green' );
      }

      jQuery( 'tr#child-site-' + id ).remove();

    }, 'json' );
    });
    return false;
};

jQuery( document ).ready( function () {
	
    jQuery( document ).on( 'click', '#mainwp_managesites_add', function (event) {
        mainwp_managesites_add( event );
    } );

    jQuery( document ).on( 'click', '#mainwp_managesites_bulkadd', function () {
        if ( jQuery( '#mainwp_managesites_file_bulkupload' ).val() == '' ) {
            setHtml( '#mainwp-message-zone', __( 'Please enter csv file for upload.' ), false );
        } else {
            jQuery( '#mainwp_managesites_bulkadd_form' ).submit();
        }
        return false;
    } );

    // Trigger Connection Test
    jQuery( document ).on( 'click', '#mainwp_managesites_test', function (event) {
        mainwp_managesites_test( event );
    } );

} );

/**
 * Add new user
 */
jQuery( document ).ready( function () {
    jQuery( document ).on( 'click', '#bulk_add_createuser', function ( event ) {
        mainwp_createuser( event );
    } );
    jQuery( '#bulk_import_createuser' ).on( 'click', function () {
        mainwp_bulkupload_users();
    } );
} );

mainwp_createuser = function () {
    var cont = true;
    if ( jQuery( '#user_login' ).val() == '' ) {
      feedback( 'mainwp-message-zone', __( 'Username field is required! Please enter a username.' ), 'yellow' );
        cont = false;
    }

    if ( jQuery( '#email' ).val() == '' ) {
      feedback( 'mainwp-message-zone', __( 'E-mail field is required! Please enter an email address.' ), 'yellow' );
        cont = false;
    }

    if ( jQuery( '#password' ).val() == '' ) {
      feedback( 'mainwp-message-zone', __( 'Password field is required! Please enter the wanted password or generate a random one.' ), 'yellow' );
        cont = false;
    }

    if ( jQuery( '#select_by' ).val() == 'site' ) {
        var selected_sites = [ ];
        jQuery( "input[name='selected_sites[]']:checked" ).each( function () {
            selected_sites.push( jQuery( this ).val() );
        } );
        if ( selected_sites.length == 0 ) {
        feedback( 'mainwp-message-zone', __( 'Please select at least one website or group.' ), 'yellow' );
            cont = false;
        }
    } else {
        var selected_groups = [ ];
        jQuery( "input[name='selected_groups[]']:checked" ).each( function () {
            selected_groups.push( jQuery( this ).val() );
        } );
        if ( selected_groups.length == 0 ) {
        feedback( 'mainwp-message-zone', __( 'Please select at least one website or group.' ), 'yellow' );
            cont = false;
        }
    }

    if ( cont ) {
      jQuery( '#mainwp-message-zone' ).removeClass( 'red green yellow' );
      jQuery( '#mainwp-message-zone' ).html( '<i class="notched circle loading icon"></i> ' + __( 'Creating the user. Please wait...' ) );
      jQuery( '#mainwp-message-zone' ).show();
        jQuery( '#bulk_add_createuser' ).attr( 'disabled', 'disabled' );
        //Add user via ajax!!
        var data = mainwp_secure_data( {
            action: 'mainwp_bulkadduser',
            'select_by': jQuery( '#select_by' ).val(),
            'selected_groups[]': selected_groups,
            'selected_sites[]': selected_sites,
            'user_login': jQuery( '#user_login' ).val(),
            'email': jQuery( '#email' ).val(),
            'url': jQuery( '#url' ).val(),
            'first_name': jQuery( '#first_name' ).val(),
            'last_name': jQuery( '#last_name' ).val(),
            'pass1': jQuery( '#password' ).val(),
            'pass2': jQuery( '#password' ).val(),
            'send_password': jQuery( '#send_password' ).attr( 'checked' ),
            'role': jQuery( '#role' ).val()
        } );

        jQuery.post( ajaxurl, data, function ( response ) {
            response = jQuery.trim( response );
            jQuery( '#mainwp-message-zone' ).hide();
            jQuery( '#bulk_add_createuser' ).removeAttr( 'disabled' );
            if ( response.substring( 0, 5 ) == 'ERROR' ) {
                var responseObj = jQuery.parseJSON( response.substring( 6 ) );
                if ( responseObj.error == undefined ) {
                    var errorMessageList = responseObj[1];
                    var errorMessage = '';
                    for ( var i = 0; i < errorMessageList.length; i++ ) {
                        if ( errorMessage != '' )
                            errorMessage = errorMessage + "<br />";
                        errorMessage = errorMessage + errorMessageList[i];
                    }
                    if ( errorMessage != '' ) {
                        feedback( 'mainwp-message-zone', errorMessage, 'red' );
                    }
                }
            } else {
        jQuery( '#mainwp-add-new-user-form' ).append( response );
        jQuery( '#mainwp-creating-new-user-modal' ).modal( 'show' );

            }
        } );
    }
};

/**
 * InstallPlugins/Themes
 */
jQuery( document ).ready( function () {
    jQuery( '#MainWPInstallBulkNavSearch' ).on( 'click', function ( event ) {
        event.preventDefault();
        jQuery( '#mainwp_plugin_bulk_install_btn' ).attr( 'bulk-action', 'install' );
        jQuery( '.mainwp-browse-plugins' ).show();
        jQuery( '.mainwp-upload-plugin' ).hide();
        jQuery( '#mainwp-search-plugins-form' ).show();
    } );
    jQuery( '#MainWPInstallBulkNavUpload' ).on( 'click', function ( event ) {
        event.preventDefault();
        jQuery( '#mainwp_plugin_bulk_install_btn' ).attr( 'bulk-action', 'upload' );
        jQuery( '.mainwp-upload-plugin' ).show();
        jQuery( '.mainwp-browse-plugins' ).hide();
        jQuery( '#mainwp-search-plugins-form' ).hide();
    } );

// not used?
    jQuery( document ).on( 'click', '.filter-links li.plugin-install a', function ( event ) {
        event.preventDefault();
        jQuery( '.filter-links li.plugin-install a' ).removeClass( 'current' );
        jQuery( this ).addClass( 'current' );
        var tab = jQuery( this ).parent().attr( 'tab' );
        if ( tab == 'search' ) {
            mainwp_install_search( event );
        } else {
            jQuery( '#mainwp_installbulk_s' ).val( '' );
            jQuery( '#mainwp_installbulk_tab' ).val( tab );
            mainwp_install_plugin_tab_search( 'tab:' + tab );
        }
    } );

    jQuery( document ).on( 'click', '#mainwp_plugin_bulk_install_btn', function () {
        var act = jQuery(this).attr('bulk-action');
        if ( act == 'install' ) {
            var selected = jQuery( "input[type='radio'][name='install-plugin']:checked" );
            if ( selected.length == 0 ) {
                feedback( 'mainwp-message-zone', __( 'Please select plugin to install files.' ), 'yellow' );
            } else {
                var selectedId = /^install-([^-]*)-(.*)$/.exec( selected.attr( 'id' ) );
                if ( selectedId ) {
                    mainwp_install_bulk( 'plugin', selectedId[2] );
                }
            }
        } else if ( act == 'upload' ) {
            mainwp_upload_bulk( 'plugins' );
        }

        return false;
    } );

    jQuery( document ).on( 'click', '#mainwp_theme_bulk_install_btn', function () {
        var act = jQuery(this).attr('bulk-action');
        if (act == 'install') {
            var selected = jQuery( "input[type='radio'][name='install-theme']:checked" );
            if ( selected.length == 0 ) {
                feedback( 'mainwp-message-zone', __( 'Please select theme to install files.' ), 'yellow' );
            } else {
                var selectedId = /^install-([^-]*)-(.*)$/.exec( selected.attr( 'id' ) );
                if ( selectedId )
                    mainwp_install_bulk( 'theme', selectedId[2] );
            }
        } else if (act == 'upload') {
            mainwp_upload_bulk('themes');
        }
        return false;
    } );
} );

mainwp_links_visit_site_and_admin = function(pUrl, pSiteId ) {
    var links = '';
    if (pUrl != '' )
        links += '<a href="' + pUrl + '" target="_blank" class="mainwp-may-hide-referrer">View Site</a> | ';
    links += '<a href="admin.php?page=SiteOpen&newWindow=yes&websiteid=' + pSiteId + '" target="_blank">Go to WP Admin</a>';
    return links;
}

bulkInstallTotal = 0;
bulkInstallDone = 0;

mainwp_install_bulk = function ( type, slug ) {
    var data = mainwp_secure_data( {
        action: 'mainwp_preparebulkinstallplugintheme',
        type: type,
        slug: slug,
        selected_by: jQuery( '#select_by' ).val()
    } );

    if ( jQuery( '#select_by' ).val() == 'site' ) {
        var selected_sites = [ ];
        jQuery( "input[name='selected_sites[]']:checked" ).each( function () {
            selected_sites.push( jQuery( this ).val() );
        } );

        if ( selected_sites.length == 0 ) {
            feedback( 'mainwp-message-zone', __( 'Please select at least one website or group.' ), 'yellow' );
            return;
        }

        data['selected_sites[]'] = selected_sites;

    } else {
        var selected_groups = [ ];

        jQuery( "input[name='selected_groups[]']:checked" ).each( function () {
            selected_groups.push( jQuery( this ).val() );
        } );

        if ( selected_groups.length == 0 ) {
            feedback( 'mainwp-message-zone', __( 'Please select at least one website or group.' ), 'yellow' );
            return;
        }

        data['selected_groups[]'] = selected_groups;
    }

    jQuery( '#plugintheme-installation-queue' ).html('');

    jQuery.post( ajaxurl, data, function ( pType, pActivatePlugin, pOverwrite ) {
        return function ( response ) {
            var installQueueContent = '<div class="ui middle aligned divided list">';

            var dateObj = new Date();
            starttimeDashboardAction = dateObj.getTime();
            if (pType == 'plugin')
                dashboardActionName = 'installing_new_plugin';
            else
                dashboardActionName = 'installing_new_theme';
            countRealItemsUpdated = 0;
            
            bulkInstallDone = 0;

            for ( var siteId in response.sites ) {
                      var site = response.sites[siteId];
                      installQueueContent += '<div class="siteBulkInstall item" siteid="' + siteId + '" status="queue">' +
                      '<div class="ui grid">' +
                      '<div class="two column row">' +
                      '<div class="column">' + site['name'].replace( /\\(.)/mg, "$1" ) + '</div>' +
                      '<div class="column">' +
                      '<span class="queue"><i class="clock outline icon"></i> ' + __( 'Queued' ) + '</span>' +
                      '<span class="progress" style="display:none"><i class="notched circle loading icon"></i> ' + __( 'Installing...' ) + '</span>' +
                      '<span class="status"></span>' +
                      '</div>' +
                      '</div>' +
                      '</div>' +
                      '</div>';
                      bulkInstallTotal++;
              }
            installQueueContent += '<div id="bulk_install_info"></div>';
            installQueueContent += '</div>';

            jQuery( '#plugintheme-installation-queue' ).html( installQueueContent );
            mainwp_install_bulk_start_next( pType, response.url, pActivatePlugin, pOverwrite );
        }
    }( type, jQuery( '#chk_activate_plugin' ).is( ':checked' ), jQuery( '#chk_overwrite' ).is( ':checked' ) ), 'json' );

    jQuery( '#plugintheme-installation-progress-modal' ).modal( 'show' );

};

bulkInstallMaxThreads = mainwpParams['maximumInstallUpdateRequests'] == undefined ? 3 : mainwpParams['maximumInstallUpdateRequests'];
bulkInstallCurrentThreads = 0;


mainwp_install_bulk_start_next = function ( pType, pUrl, pActivatePlugin, pOverwrite ) {
    while ( ( siteToInstall = jQuery( '.siteBulkInstall[status="queue"]:first' ) ) && ( siteToInstall.length > 0 ) && ( bulkInstallCurrentThreads < bulkInstallMaxThreads ) ) {
        mainwp_install_bulk_start_specific( pType, pUrl, pActivatePlugin, pOverwrite, siteToInstall );
    }

    if (bulkInstallDone == bulkInstallTotal && bulkInstallTotal != 0) {
        if (mainwpParams.enabledTwit == true) {
            var dateObj = new Date();
            var countSec = (dateObj.getTime() - starttimeDashboardAction) / 1000;
            jQuery('#bulk_install_info').html('<i class="fa fa-spinner fa-pulse"></i>');
            if (countSec <= mainwpParams.maxSecondsTwit) {
                var data = mainwp_secure_data( {
                    action:'mainwp_twitter_dashboard_action',
                    actionName: dashboardActionName,
                    countSites: countRealItemsUpdated,
                    countSeconds: countSec,
                    countItems: 1,
                    countRealItems: countRealItemsUpdated,
                    showNotice: 1
                } );
                jQuery.post(ajaxurl, data, function (res) {
                    if (res && res != ''){
                        jQuery('#bulk_install_info').html(res);
                        if (typeof twttr !== "undefined")
                            twttr.widgets.load();
                    } else {
                        jQuery('#bulk_install_info').html('');
                    }
                });
            }
        }
        jQuery('#bulk_install_info').before('<div class="ui info message">' + mainwp_install_bulk_you_know_msg(pType, 1) + '</div>');
    }

};

mainwp_install_bulk_start_specific = function ( pType, pUrl, pActivatePlugin, pOverwrite, pSiteToInstall ) {
    bulkInstallCurrentThreads++;

    pSiteToInstall.attr( 'status', 'progress' );
    pSiteToInstall.find( '.queue' ).hide();
    pSiteToInstall.find( '.progress' ).show();

    var data = mainwp_secure_data( {
        action: 'mainwp_installbulkinstallplugintheme',
        type: pType,
        url: pUrl,
        activatePlugin: pActivatePlugin,
        overwrite: pOverwrite,
        siteId: pSiteToInstall.attr( 'siteid' )
    } );

  jQuery.post( ajaxurl, data, function ( pType, pUrl, pActivatePlugin, pOverwrite, pSiteToInstall ) {
    return function ( response ) {
            pSiteToInstall.attr( 'status', 'done' );
      pSiteToInstall.find( '.progress' ).hide();

            var statusEl = pSiteToInstall.find( '.status' );
            statusEl.show();

            if ( response.error != undefined ) {
                statusEl.html( response.error );
                statusEl.css( 'color', 'red' );
            } else if ( ( response.ok != undefined ) && ( response.ok[pSiteToInstall.attr( 'siteid' )] != undefined ) ) {
              statusEl.html( '<i class="check circle green icon"></i> ' + __( 'Installed successfully.' ) + ' ' + mainwp_links_visit_site_and_admin('', pSiteToInstall.attr( 'siteid' )) + '</span>' );
              countRealItemsUpdated++;
            } else if ( ( response.errors != undefined ) && ( response.errors[pSiteToInstall.attr( 'siteid' )] != undefined ) ) {
              statusEl.html( '<i class="times circle red icon"></i> ' + __( 'Installation failed!' ) + '(' + response.errors[pSiteToInstall.attr( 'siteid' )][1] + ')' ) ;
            } else {
              statusEl.html( '<i class="times circle red icon"></i> ' + __( 'Installation failed!' ) );
            }

            bulkInstallCurrentThreads--;
            bulkInstallDone++;

            mainwp_install_bulk_start_next( pType, pUrl, pActivatePlugin, pOverwrite );
        }
    }( pType, pUrl, pActivatePlugin, pOverwrite, pSiteToInstall ), 'json' );
};


mainwp_install_bulk_you_know_msg = function(pType, pTotal) {
    var msg = '';
    if (mainwpParams.installedBulkSettingsManager && mainwpParams.installedBulkSettingsManager == 1) {
        if (pType == 'plugin') {
            if (pTotal == 1)
                msg = __('Would you like to use the Bulk Settings Manager with this plugin? Check out the %1Documentation%2.', '<a href="http://docs.mainwp.com/category/mainwp-extensions/mainwp-bulk-settings-manager/" target="_blank">', '</a>');
            else
                msg = __('Would you like to use the Bulk Settings Manager with these plugins? Check out the %1Documentation%2.', '<a href="http://docs.mainwp.com/category/mainwp-extensions/mainwp-bulk-settings-manager/" target="_blank">', '</a>');
        } else {
            if (pTotal == 1)
                msg = __('Would you like to use the Bulk Settings Manager with this theme? Check out the %1Documentation%2.', '<a href="http://docs.mainwp.com/category/mainwp-extensions/mainwp-bulk-settings-manager/" target="_blank">', '</a>');
            else
                msg = __('Would you like to use the Bulk Settings Manager with these themes? Check out the %1Documentation%2.', '<a href="http://docs.mainwp.com/category/mainwp-extensions/mainwp-bulk-settings-manager/" target="_blank">', '</a>');
        }
    } else {
        if (pType == 'plugin') {
            if (pTotal == 1)
                msg = __('Did you know with the %1 you can control the settings of this plugin directly from your MainWP Dashboard?', '<a href="https://mainwp.com/extensions/bulk-settings-manager" target="_blank">Bulk Settings Extension</a>');
            else
                msg = __('Did you know with the %1 you can control the settings of these plugins directly from your MainWP Dashboard?', '<a href="https://mainwp.com/extensions/bulk-settings-manager" target="_blank">Bulk Settings Extension</a>');
        } else {
            if (pTotal == 1)
                msg = __('Did you know with the %1 you can control the settings of this theme directly from your MainWP Dashboard?', '<a href="https://mainwp.com/extensions/bulk-settings-manager" target="_blank">Bulk Settings Extension</a>');
            else
                msg = __('Did you know with the %1 you can control the settings of these themes directly from your MainWP Dashboard?', '<a href="https://mainwp.com/extensions/bulk-settings-manager" target="_blank">Bulk Settings Extension</a>');
        }
    }
    return msg;
}

// Install by Upload
mainwp_upload_bulk = function ( type ) {

    if ( type == 'plugins' ) {
        type = 'plugin';
    } else {
        type = 'theme';
    }

    var files = [ ];

    jQuery( ".qq-upload-file" ).each( function () {
        if ( jQuery( this ).closest('.file-uploaded-item').hasClass( 'qq-upload-success' )) {
            files.push( jQuery( this ).attr( 'filename' ) );
        }
    } );

    if ( files.length == 0 ) {
        if ( type == 'plugin' ) {
                feedback( 'mainwp-message-zone', __( 'Please upload plugins to install.' ), 'yellow' );
        } else {
                feedback( 'mainwp-message-zone', __( 'Please upload themes to install.' ), 'yellow' );
        }
        return;
    }

    var data = mainwp_secure_data( {
        action: 'mainwp_preparebulkuploadplugintheme',
        type: type,
        selected_by: jQuery( '#select_by' ).val()
    } );
    if ( jQuery( '#select_by' ).val() == 'site' ) {
        var selected_sites = [ ];
        jQuery( "input[name='selected_sites[]']:checked" ).each( function () {
            selected_sites.push( jQuery( this ).val() );
        } );

        if ( selected_sites.length == 0 ) {
            feedback( 'mainwp-message-zone', __( 'Please select websites or groups to install files.' ), 'yellow' );
            return;
        }
        data['selected_sites[]'] = selected_sites;
    } else {
        var selected_groups = [ ];
        jQuery( "input[name='selected_groups[]']:checked" ).each( function () {
            selected_groups.push( jQuery( this ).val() );
        } );
        if ( selected_groups.length == 0 ) {
            feedback( 'mainwp-message-zone', __( 'Please select websites or groups to install files.' ), 'yellow' );
            return;
        }
        data['selected_groups[]'] = selected_groups;
    }

    data['files[]'] = files;

    jQuery.post( ajaxurl, data, function ( pType, pFiles, pActivatePlugin, pOverwrite ) {
        return function ( response ) {
            var installQueue = '<div class="ui middle aligned divided list">';
            for ( var siteId in response.sites ) {
                var site = response.sites[siteId];
                
                installQueue += '<div class="siteBulkInstall item" siteid="' + siteId + '" status="queue">' +
                      '<div class="ui grid">' +
                      '<div class="two column row">' +
                      '<div class="column">' + site['name'].replace( /\\(.)/mg, "$1" ) + '</div>' +
                      '<div class="column">' +
                      '<span class="queue"><i class="clock outline icon"></i> ' + __( 'Queued' ) + '</span>' +
                      '<span class="progress" style="display:none"><i class="notched circle loading icon"></i> ' + __( 'Installing...' ) + '</span>' +
                      '<span class="status"></span>' +
                      '</div>' +
                      '</div>' +
                      '</div>' +
                      '</div>';

            }            
            installQueue += '</div>';
            jQuery( '#plugintheme-installation-queue' ).html( installQueue );
            mainwp_upload_bulk_start_next( pType, response.urls, pActivatePlugin, pOverwrite );
        }
    }( type, files, jQuery( '#chk_activate_plugin' ).is( ':checked' ), jQuery( '#chk_overwrite' ).is( ':checked' ) ), 'json' );

    jQuery( '#plugintheme-installation-progress-modal' ).modal('show');
     jQuery('.qq-upload-list').html(''); // empty files list
    return false;
};

mainwp_upload_bulk_start_next = function ( pType, pUrls, pActivatePlugin, pOverwrite ) {
    while ( ( siteToInstall = jQuery( '.siteBulkInstall[status="queue"]:first' ) ) && ( siteToInstall.length > 0 ) && ( bulkInstallCurrentThreads < bulkInstallMaxThreads ) ) {
        mainwp_upload_bulk_start_specific( pType, pUrls, pActivatePlugin, pOverwrite, siteToInstall );
    }

    if ( ( siteToInstall.length == 0 ) && ( bulkInstallCurrentThreads == 0 ) ) {
        var data = mainwp_secure_data( {
            action: 'mainwp_cleanbulkuploadplugintheme'
        } );

        jQuery.post( ajaxurl, data, function () { } );
        var msg = mainwp_install_bulk_you_know_msg(pType, jQuery('#bulk_upload_info').attr('number-files'));
        jQuery('#bulk_upload_info').html('<div class="mainwp-notice mainwp-notice-blue">' + msg + '</div>');
    }
};

mainwp_upload_bulk_start_specific = function ( pType, pUrls, pActivatePlugin, pOverwrite, pSiteToInstall )
{
    bulkInstallCurrentThreads++;
    pSiteToInstall.attr( 'status', 'progress' );

    pSiteToInstall.find( '.queue' ).hide();
    pSiteToInstall.find( '.progress' ).show();

    var data = mainwp_secure_data( {
        action: 'mainwp_installbulkuploadplugintheme',
        type: pType,
        urls: pUrls,
        activatePlugin: pActivatePlugin,
        overwrite: pOverwrite,
        siteId: pSiteToInstall.attr( 'siteid' )
    } );

    jQuery.post( ajaxurl, data, function ( pType, pUrls, pActivatePlugin, pOverwrite, pSiteToInstall )
    {
        return function ( response )
        {
            pSiteToInstall.attr( 'status', 'done' );

            pSiteToInstall.find( '.progress' ).hide();
            var statusEl = pSiteToInstall.find( '.status' );
            statusEl.show();

            if ( response.error != undefined )
            {
                statusEl.html( response.error );
                statusEl.css( 'color', 'red' );
            } else if ( ( response.ok != undefined ) && ( response.ok[pSiteToInstall.attr( 'siteid' )] != undefined ) )
            {
                statusEl.html( '<i class="check circle green icon"></i> ' + __( 'Installed successfully.' ) + '</span>' );
            } else if ( ( response.errors != undefined ) && ( response.errors[pSiteToInstall.attr( 'siteid' )] != undefined ) )
            {
                statusEl.html( '<i class="times circle red icon"></i> ' + __( 'Installation failed!' ) + '(' + response.errors[pSiteToInstall.attr( 'siteid' )][1]  + ')' );

            } else
            {
                statusEl.html( '<i class="times circle red icon"></i> ' + __( 'Installation failed!' ) );
            }

            bulkInstallCurrentThreads--;
            mainwp_upload_bulk_start_next( pType, pUrls, pActivatePlugin, pOverwrite );
        }
    }( pType, pUrls, pActivatePlugin, pOverwrite, pSiteToInstall ), 'json' );
};

/**
 * Utility
 */
function isUrl( s ) {
    var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
    return regexp.test( s );
}
function setVisible( what, vis ) {
    if ( vis ) {
        jQuery( what ).show();
    } else {
        jQuery( what ).hide();
    }
}
function setHtml( what, text, ptag ) {
    if ( typeof ptag == "undefined" )
        ptag = true;

    setVisible( what, true );
    if ( ptag )
        jQuery( what ).html( '<span>' + text + '</span>' );
    else
        jQuery( what ).html( text );
    scrollToElement( what );
}


/**
 * Notes
 */
jQuery( document ).ready( function () {

    jQuery( document ).on( 'click', '#mainwp-notes-cancel', function () {
        jQuery( '#mainwp-notes-status' ).html('');
        mainwp_notes_hide();
        return false;
    } );

    jQuery( document ).on( 'click', '#mainwp-notes-save', function () {
        var which = jQuery( '#mainwp-which-note' ).val();
        if (which == 'site') {
            mainwp_notes_site_save();
        } else if ( which == 'theme' ) {
            mainwp_notes_theme_save();
        } else if ( which == 'plugin' ) {
            mainwp_notes_plugin_save()
        }
        var newnote = jQuery( '#mainwp-notes-note' ).val();
        jQuery( '#mainwp-notes-html' ).html( newnote );
        return false;
    } );

    jQuery( document ).on( 'click', '.mainwp-edit-site-note', function () {
        var id = jQuery( this ).attr( 'id' ).substr( 13 );
        var note = jQuery( '#mainwp-notes-' + id + '-note' ).html();
        jQuery( '#mainwp-notes-html' ).html( note == '' ? __( 'No saved notes. Click the Edit button to edit site notes.' ) : note );
        jQuery( '#mainwp-notes-note' ).val( note );
        jQuery( '#mainwp-notes-websiteid' ).val( id );
        mainwp_notes_show();
        return false;
    } );

jQuery( document ).on( 'click', '#mainwp-notes-edit', function () {
        //var value = jQuery( '#mainwp-notes-html').html();
        jQuery( '#mainwp-notes-html' ).hide();
        jQuery( '#mainwp-notes-editor' ).show();
        //jQuery( '#mainwp-notes-note').val( value );
        jQuery( this ).hide();
        jQuery( '#mainwp-notes-save' ).show();
        jQuery( '#mainwp-notes-status' ).html('');
        // jQuery( '#mainwp-notes' ).addClass( 'edit-mode' );
        return false;
    } );
    jQuery( '#redirectForm' ).submit();
} );

mainwp_notes_show = function () {
  jQuery( '#mainwp-notes' ).modal( 'show' );
  jQuery( '#mainwp-notes-html' ).show();
  jQuery( '#mainwp-notes-editor' ).hide();
  jQuery( '#mainwp-notes-save' ).hide();
  jQuery( '#mainwp-notes-edit' ).show();
};
mainwp_notes_hide = function () {
  jQuery( '#mainwp-notes' ).modal( 'hide' );
};
mainwp_notes_site_save = function () {
    var normalid = jQuery( '#mainwp-notes-websiteid' ).val();
    var newnote = jQuery( '#mainwp-notes-note' ).val();
    var data = mainwp_secure_data( {
        action: 'mainwp_notes_save',
        websiteid: normalid,
        note: newnote
    } );

    jQuery( '#mainwp-notes-status' ).html( '<i class="notched circle loading icon"></i> ' + __( 'Saving note. Please wait...' ) );

    jQuery.post( ajaxurl, data, function ( response ) {
      if ( response.error != undefined ){
        jQuery( '#mainwp-notes-status' ).html( '<i class="times circle red icon"></i> ' +  response.error );
      } else if ( response.result == 'SUCCESS' ) {
        jQuery( '#mainwp-notes-status' ).html( '<i class="check circle green icon"></i> ' +  __( 'Note saved.' ) );
        if ( jQuery( '#mainwp-notes-' + normalid + '-note' ).length > 0 ) {
            jQuery( '#mainwp-notes-' + normalid + '-note' ).html( jQuery( '#mainwp-notes-note' ).val() );
        }
      } else {
        jQuery( '#mainwp-notes-status' ).html( '<i class="times circle red icon"></i> ' + __( 'Undefined error occured while saving your note!' ) + '.' );
      }
    }, 'json' );


    jQuery( '#mainwp-notes-html' ).show();
    jQuery( '#mainwp-notes-editor' ).hide();
    jQuery( '#mainwp-notes-save' ).hide();
    jQuery( '#mainwp-notes-edit' ).show();

};

getErrorMessage = function ( pError )
{
    if ( pError.message == 'HTTPERROR' ) {
        return __( 'HTTP error' ) + '! ' + pError.extra;
    } else if ( pError.message == 'NOMAINWP' || pError == 'NOMAINWP' ) {
        var error = '';
        if ( pError.extra )
        {
            error = __( 'MainWP Child plugin not detected. First, install and activate the plugin and add your site to your MainWP Dashboard afterward. If you continue experiencing this issue, check the child site for <a href="https://meta.mainwp.com/t/known-plugin-conflicts/402">known plugin conflicts</a>, or check the <a href="https://meta.mainwp.com/c/community-support/5">MainWP Community</a> for help.', pError.extra ); // to fix incorrect encoding
        } else
        {
            error = __( 'MainWP Child plugin not detected! First install and activate the MainWP Child plugin and add your site to MainWP Dashboard afterwards.' );
        }

        return error;
    } else if ( pError.message == 'ERROR' ) {
        return 'ERROR' + ( ( pError.extra != '' ) && ( pError.extra != undefined ) ? ': ' + pError.extra : '' );
    } else if ( pError.message == 'WPERROR' ) {
        return __( 'ERROR on the child site' ) + ( ( pError.extra != '' ) && ( pError.extra != undefined ) ? ': ' + pError.extra : '' );
    } else if ( pError.message != undefined && pError.message != '' )
    {
        return pError.message;
    } else
    {
        return pError;
    }
};

dateToHMS = function ( date ) {
    if ( mainwpParams != undefined && mainwpParams['time_format'] != undefined )
    {
        var time = moment( date );
        var format = mainwpParams['time_format'];
        format = format.replace( 'g', 'h' );
        format = format.replace( 'i', 'mm' );
        format = format.replace( 's', 'ss' );
        format = format.replace( 'F', 'MMMM' );
        format = format.replace( 'j', 'D' );
        format = format.replace( 'Y', 'YYYY' );
        return time.format( format );
    }
    var h = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();
    return '' + ( h <= 9 ? '0' + h : h ) + ':' + ( m <= 9 ? '0' + m : m ) + ':' + ( s <= 9 ? '0' + s : s );
};
appendToDiv = function ( pSelector, pText, pScrolldown, pShowTime )
{
    if ( pScrolldown == undefined )
        pScrolldown = true;
    if ( pShowTime == undefined )
        pShowTime = true;

    var theDiv = jQuery( pSelector );
    theDiv.append( '<br />' + ( pShowTime ? dateToHMS( new Date() ) + ' ' : '' ) + pText );
    if ( pScrolldown )
        theDiv.animate( { scrollTop: theDiv.prop( "scrollHeight" ) }, 100 );
};

jQuery.fn.exists = function () {
    return ( this.length !== 0 );
};


function __( text, _var1, _var2, _var3 )
{
    if ( text == undefined || text == '' )
        return text;
    var strippedText = text.replace( / /g, '_' );
    strippedText = strippedText.replace( /[^A-Za-z0-9_]/g, '' );

    if ( strippedText == '' )
        return text.replace( '%1', _var1 ).replace( '%2', _var2 ).replace( '%3', _var3 );

    if ( mainwpTranslations == undefined )
        return text.replace( '%1', _var1 ).replace( '%2', _var2 ).replace( '%3', _var3 );
    if ( mainwpTranslations[strippedText] == undefined )
        return text.replace( '%1', _var1 ).replace( '%2', _var2 ).replace( '%3', _var3 );

    return mainwpTranslations[strippedText].replace( '%1', _var1 ).replace( '%2', _var2 ).replace( '%3', _var3 );
}

mainwp_secure_data = function ( data, includeDts )
{
    if ( data['action'] == undefined )
        return data;

    data['security'] = security_nonces[data['action']];
    if ( includeDts )
        data['dts'] = Math.round( new Date().getTime() / 1000 );
    return data;
};


mainwp_uid = function () {
    // always start with a letter (for DOM friendlyness)
    var idstr = String.fromCharCode( Math.floor( ( Math.random() * 25 ) + 65 ) );
    do {
        // between numbers and characters (48 is 0 and 90 is Z (42-48 = 90)
        var ascicode = Math.floor( ( Math.random() * 42 ) + 48 );
        if ( ascicode < 58 || ascicode > 64 ) {
            // exclude all chars between : (58) and @ (64)
            idstr += String.fromCharCode( ascicode );
        }
    } while ( idstr.length < 32 );

    return ( idstr );
};

scrollToElement = function () {
    jQuery( 'html,body' ).animate( {
        scrollTop: 0
    }, 1000 );

    return false;
};

jQuery( document ).ready( function () {
    jQuery( '#backup_filename' ).keypress( function ( e )
    {
        var chr = String.fromCharCode( e.which );
        return ( "$^&*/".indexOf( chr ) < 0 );
    } );
    jQuery( '#backup_filename' ).change( function () {
        var value = jQuery( this ).val();
        var notAllowed = [ '$', '^', '&', '*', '/' ];
        for ( var i = 0; i < notAllowed.length; i++ )
        {
            var char = notAllowed[i];
            if ( value.indexOf( char ) >= 0 )
            {
                value = value.replace( new RegExp( '\\' + char, 'g' ), '' );
                jQuery( this ).val( value );
            }
        }
    } );
} );

/*
 * Server Info
 */

serverinfo_prepare_download_info = function ( communi ) {
    var report = "";
    jQuery( '.mainwp-system-info-table thead, .mainwp-system-info-table tbody' ).each( function () {
        var td_len = [ 35, 55, 45, 12, 12 ];
        var th_count = 0;
        var i;
        if ( jQuery( this ).is( 'thead' ) ) {
            i = 0;
            report = report + "\n### ";
            th_count = jQuery( this ).find( 'th:not(".mwp-not-generate-row")' ).length;
            jQuery( this ).find( 'th:not(".mwp-not-generate-row")' ).each( function () {
                var len = td_len[i];
                if ( i == 0 || i == th_count - 1 )
                    len = len - 4;
                report = report + jQuery.mwp_strCut( jQuery.trim( jQuery( this ).text() ), len, ' ' );
                i++;
            } );
            report = report + " ###\n\n";
        } else {
            jQuery( 'tr', jQuery( this ) ).each( function () {
                if ( communi && jQuery( this ).hasClass( 'mwp-not-generate-row' ) )
                    return;
                i = 0;
                jQuery( this ).find( 'td:not(".mwp-not-generate-row")' ).each( function () {
                    if ( jQuery( this ).hasClass( 'mwp-hide-generate-row' ) ) {
                        report = report + jQuery.mwp_strCut( ' ', td_len[i], ' ' );
                        i++;
                        return;
                    }
                    report = report + jQuery.mwp_strCut( jQuery.trim( jQuery( this ).text() ), td_len[i], ' ' );
                    i++;
                } );
                report = report + "\n";
            } );

        }
    } );

    try {
            if ( communi ) {
                report = '```' +  "\n" + report +  "\n" + '```';
            }

            //jQuery( "#download-server-information" ).slideDown();
            jQuery( "#download-server-information textarea" ).val( report ).focus().select();
    } catch ( e ) {
        console.log('Error:');
    }
    return false;
}

jQuery( document ).on( 'click', '#mainwp-download-system-report', function () {
    serverinfo_prepare_download_info( false );
    var server_info = jQuery( '#download-server-information textarea' ).val();
    var blob = new Blob( [ server_info ], { type: "text/plain;charset=utf-8" } );
    saveAs( blob, "mainwp-system-report.txt" );
    return false;
} );

jQuery( document ).on( 'click', '#mainwp-copy-meta-system-report', function () {
    jQuery( "#download-server-information" ).slideDown(); // to able to select and copy
    serverinfo_prepare_download_info( true );
    jQuery( "#download-server-information" ).slideUp();
    try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        console.log('Copying text command was ' + msg);
    } catch (err) {
        console.log('Oops, unable to copy');
    }
    return false;
} );


jQuery.mwp_strCut = function ( i, l, s, w ) {
    var o = i.toString();
    if ( !s ) {
        s = '0';
    }
    while ( o.length < parseInt( l ) ) {
        // empty
        if ( w == 'undefined' ) {
            o = s + o;
        } else {
            o = o + s;
        }
    }
    return o;
};

updateExcludedFolders = function ()
{
    var excludedBackupFiles = jQuery( '#excludedBackupFiles' ).html();
    jQuery( '#mainwp-kbl-content' ).val( excludedBackupFiles == undefined ? '' : excludedBackupFiles );

    var excludedCacheFiles = jQuery( '#excludedCacheFiles' ).html();
    jQuery( '#mainwp-kcl-content' ).val( excludedCacheFiles == undefined ? '' : excludedCacheFiles );

    var excludedNonWPFiles = jQuery( '#excludedNonWPFiles' ).html();
    jQuery( '#mainwp-nwl-content' ).val( excludedNonWPFiles == undefined ? '' : excludedNonWPFiles );
};


jQuery( document ).on( 'click', '.mainwp-events-notice-dismiss', function ()
{
    var notice = jQuery( this ).attr( 'notice' );
    jQuery( this ).closest( '.ui.message' ).fadeOut( 500 );
    var data = mainwp_secure_data( {
        action: 'mainwp_events_notice_hide',
        notice: notice
    } );
    jQuery.post( ajaxurl, data, function () {
    } );
    return false;
} );

// Turn On child plugin auto update
jQuery( document ).on( 'click', '#mainwp_btn_autoupdate_and_trust', function () {
  jQuery( this ).attr( 'disabled', 'true' );
  var data = mainwp_secure_data( {
      action: 'mainwp_autoupdate_and_trust_child'
  } );
  jQuery.post( ajaxurl, data, function ( res ) {
    if ( res == 'ok' ) {
      location.reload( true );
    } else {
      jQuery( this ).removeAttr( 'disabled' );
    }
  } );
  return false;
} );

// Hide installation warning
jQuery( document ).on( 'click', '#remove-mainwp-installation-warning', function () {
  jQuery(this).closest('.ui.message').fadeOut("slow");
  var data = mainwp_secure_data( {
    action: 'mainwp_installation_warning_hide'
  } );
  jQuery.post( ajaxurl, data, function () { } );
  return false;
} );

jQuery( document ).on( 'click', '.mainwp-notice-hide', function () {
  jQuery(this).closest('.ui.message').fadeOut("slow");
  return false;
} );

// Hide after installtion notices (PHP version, Trust MainWP Child, Multisite Warning and OpenSSL warning)
jQuery( document ).on( 'click', '.mainwp-notice-dismiss', function () {
  var notice_id = jQuery( this ).attr( 'notice-id' );
  jQuery(this).closest('.ui.message').fadeOut("slow");
  var data = {
    action: 'mainwp_notice_status_update'
  };
  data['notice_id'] = notice_id;
  jQuery.post( ajaxurl, mainwp_secure_data( data ), function () { } );
  return false;
} );

jQuery( document ).on( 'click', '.mainwp-activate-notice-dismiss', function () {
    jQuery( this ).closest( 'tr' ).fadeOut( "slow" );
    var data = mainwp_secure_data( {
        action: 'mainwp_dismiss_activate_notice',
        slug: jQuery( this ).closest( 'tr' ).attr( 'slug' )
    } );
    jQuery.post( ajaxurl, data, function () {
    } );
    return false;
} );


jQuery(document).on('click', '.mainwp-dismiss-twit', function(){
    jQuery(this).closest('.mainwp-tips').fadeOut("slow");
    mainwp_twitter_dismiss(this);
    return false;
});

mainwp_twitter_dismiss = function(obj) {
    var data = mainwp_secure_data({
        action:'mainwp_dismiss_twit',
        twitId: jQuery(obj).closest('.mainwp-tips').find('.mainwp-tip').attr('twit-id'),
        what: jQuery(obj).closest('.mainwp-tips').find('.mainwp-tip').attr('twit-what')
    } );

    jQuery.post( ajaxurl, data, function () {
        // Ok.
    });
};

jQuery( document ).on( 'click', 'button.mainwp_tweet_this', function(){
    var url = mainwpTweetUrlBuilder({
        text: jQuery(this).attr('msg')
    });
    window.open(url, 'Tweet', 'height=450,width=700');
    mainwp_twitter_dismiss(this);
});

mainwpTweetUrlBuilder = function(o){
    return [
        'https://twitter.com/intent/tweet?tw_p=tweetbutton',
        '&url=" "',
        '&text=', o.text
    ].join('');
};

mainwp_managesites_update_childsite_value = function ( siteId, uniqueId ) {
    var data = mainwp_secure_data( {
        action: 'mainwp_updatechildsite_value',
        site_id: siteId,
        unique_id: uniqueId
    } );
    jQuery.post( ajaxurl, data, function () {
    } );
    return false;
};

jQuery( document ).on( 'keyup', '#managegroups-filter', function () {
    var filter = jQuery( this ).val();
    var groupItems = jQuery( this ).parent().parent().find( 'li.managegroups-listitem' );
    for ( var i = 0; i < groupItems.length; i++ )
    {
        var currentElement = jQuery( groupItems[i] );
        if ( currentElement.hasClass( 'managegroups-group-add' ) )
            continue;
        var value = currentElement.find( 'span.text' ).text();
        if ( value.indexOf( filter ) > -1 )
        {
            currentElement.show();
        } else
        {
            currentElement.hide();
        }
    }
} );

// for normal checkboxes
jQuery( document ).on( 'change', '#cb-select-all-top, #cb-select-all-bottom', function () {
        var $this = jQuery(this),
        $table = $this.closest('table'),
        controlChecked = $this.prop('checked');

        //console.log($table);

        if ( $table.length == 0)
            return false;

        $table.children( 'tbody' ).filter(':visible')
        .children().children('.check-column').find(':checkbox')
        .prop('checked', function() {
            if ( jQuery(this).is(':hidden,:disabled') ) {
                    return false;
            }
            if ( controlChecked ) {
                    return true;
            }
            return false;
        });

        $table.children('thead,  tfoot').filter(':visible')
        .children().children('.check-column').find(':checkbox')
        .prop('checked', function() {
            if ( controlChecked ) {
                    return true;
            }
            return false;
        });
} );


updatesoverview_send_twitt_info = function() {
    var send = false;
    if (mainwpParams.enabledTwit == true) {
        var dateObj = new Date();
        var countSec = (dateObj.getTime() - starttimeDashboardAction) / 1000;
        if (countSec <= mainwpParams.maxSecondsTwit) {
            send = true;
            var data = mainwp_secure_data( {
                action:'mainwp_twitter_dashboard_action',
                actionName: dashboardActionName,
                countSites: websitesDone,
                countSeconds: countSec,
                countItems: couttItemsToUpdate,
                countRealItems: countRealItemsUpdated
            } );
            jQuery.post(ajaxurl, data, function () {                
            });
        }
    }
    return send;
};


/* eslint-disable complexity */
function mainwp_according_table_sorting( pObj ) {
    var table, th, rows, switching, i, x, y, xVal, yVal, campare = false, shouldSwitch = false, dir, switchcount = 0, n, skip = 1;
    table = jQuery(pObj).closest('table')[0];

    // get TH element
    if (jQuery(pObj)[0].tagName == 'TH') {
        th = jQuery(pObj)[0];
    } else {
        th = jQuery(pObj).closest('th')[0];
    }

    n = th.cellIndex;
    switching = true;

    // check header and footer of according table
    if( jQuery(table).children('thead,tfoot').length > 0)
        skip+=jQuery(table).children('thead,tfoot').length; // skip sorting header, footer

    dir = "asc";
    /* loop until switching has been done: */
    while (switching) {
      switching = false;
      rows = table.rows;

      /* Loop through all table rows */
      for (i = 1; i < (rows.length - skip); i+=2) {  // skip content according rows, sort by title rows only
            shouldSwitch = false;
            /* Get the two elements you want to compare,
            one from current row and one from the next-next: */
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 2].getElementsByTagName("TD")[n];

            // if sort value attribute existed then sorting on that else sorting on cell value
            if (x.hasAttribute('sort-value')) {
                xVal = parseInt(x.getAttribute('sort-value'));
                yVal = parseInt(y.getAttribute('sort-value'));
                campare = ( xVal == yVal ) ? 0 : ( xVal > yVal ? -1 : 1 );
            } else {
                // to prevent text() clear text content
                xVal = '<p>' + x.innerHTML + '</p>';
                yVal = '<p>' + y.innerHTML + '</p>';
                xVal = jQuery(xVal).text().trim().toLowerCase();
                yVal = jQuery(yVal).text().trim().toLowerCase();
                campare = yVal.localeCompare(xVal);
            }

            /* Check if the two rows should switch place */
            if (dir == "asc") {
              if ( campare < 0 ) { //xVal > yVal
                shouldSwitch = true;
                // break the loop:
                break;
              }
            } else if (dir == "desc") {
              if (campare > 0) { //xVal < yVal
                // break the loop:
                shouldSwitch = true;
                break;
              }
            }
      }
      if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 2], rows[i]);
            rows[i+1].parentNode.insertBefore(rows[i + 3], rows[i+1]);
            switching = true;
            // increase this count by 1, that is ok
            switchcount ++;
      } else {
            /* If no switching has been done AND the direction is "asc",
            set the direction to "desc" and run the while loop again. */
            if (switchcount == 0 && dir == "asc") {
              dir = "desc";
              switching = true;
            }
      }
    }

    // no row sorting so change direction for arrows switch
    if (switchcount == 0) {
        if (jQuery(pObj).hasClass('ascending')){
            dir = "desc";
        } else {
            dir = "asc";
        }
    }

    // add/remove class for arrows displaying
    if (dir == "asc") {
        jQuery(pObj).addClass('ascending');
        jQuery(pObj).removeClass('descending');
    } else {
        jQuery(pObj).removeClass('ascending');
        jQuery(pObj).addClass('descending');
    }
}
/* eslint-enable complexity */

jQuery( document ).ready( function () {
    jQuery( '.handle-accordion-sorting' ).on( 'click', function() {
            mainwp_according_table_sorting( this );
            return false;
    } );
} );
                                
mainwp_force_destroy_sessions = function () {
  var confirmMsg = __( 'Forces your dashboard to reconnect with your child sites?' );
  mainwp_confirm( confirmMsg, function() {
    mainwp_force_destroy_sessions_websites = jQuery( '.dashboard_wp_id' ).map( function ( indx, el ) {
      return jQuery( el ).val();
    } );
    mainwpPopup( '#mainwp-sync-sites-modal' ).init( { pMax: mainwp_force_destroy_sessions_websites.length } );
    mainwp_force_destroy_sessions_part_2( 0 );
  });
};

mainwp_force_destroy_sessions_part_2 = function ( id ) {
  if ( id >= mainwp_force_destroy_sessions_websites.length ) {
    mainwp_force_destroy_sessions_websites = [ ];
    if ( mainwp_force_destroy_sessions_successed == mainwp_force_destroy_sessions_websites.length ) {
      setTimeout( function ()
      {
       mainwpPopup( '#mainwp-sync-sites-modal' ).close(true);
      }, 3000 );
    }
    mainwpPopup( '#mainwp-sync-sites-modal' ).close(true);
    return;
  }

  var website_id = mainwp_force_destroy_sessions_websites[id];
  dashboard_update_site_status( website_id, '<i class="sync alternate loading icon"></i>' );

  jQuery.post( ajaxurl, { 'action': 'mainwp_force_destroy_sessions', 'website_id': website_id, 'security': security_nonces['mainwp_force_destroy_sessions'] }, function ( response ) {
    var counter = id + 1;
    mainwp_force_destroy_sessions_part_2( counter );

    mainwpPopup( '#mainwp-sync-sites-modal' ).setProgressValue( counter );

    if ( 'error' in response ) {
      dashboard_update_site_status( website_id, '<i class="exclamation red icon"></i>' );
    } else if ( 'success' in response ) {
      mainwp_force_destroy_sessions_successed += 1;
      dashboard_update_site_status( website_id, '<i class="check green icon"></i>', true );
    } else {
      dashboard_update_site_status( website_id, '<i class="exclamation yellow icon"></i>' );
    }
  }, 'json' ).fail( function () {
    var counter = id + 1;
    mainwp_force_destroy_sessions_part_2( counter );
    mainwpPopup( '#mainwp-sync-sites-modal' ).setProgressValue( counter );

    dashboard_update_site_status( website_id, '<i class="exclamation red icon"></i>' );
  } );

};

var mainwp_force_destroy_sessions_successed = 0;
var mainwp_force_destroy_sessions_websites = [];


jQuery( document ).on( 'change', '#mainwp_archiveFormat', function ()
{
    var zipMethod = jQuery( this ).val();
    zipMethod = zipMethod.replace( /\./g, '\\.' );
    jQuery( 'span.archive_info' ).hide();
    jQuery( 'span#info_' + zipMethod ).show();

    jQuery( 'tr.archive_method' ).hide();
    jQuery( 'tr.archive_' + zipMethod ).show();

    // compare new layout
    jQuery( 'div.archive_method' ).hide();
    jQuery( 'div.archive_' + zipMethod ).show();
} );


// MainWP Tools
jQuery( document ).ready( function () {
    jQuery( document ).on( 'click', '#force-destroy-sessions-button', function () {
        mainwp_force_destroy_sessions();
    } );
} );


jQuery( document ).ready( function () {
    if ( jQuery('body.mainwp-ui').length > 0 ) {
        jQuery('.mainwp-ui-page .ui.dropdown:not(.not-auto-init)').dropdown();
        jQuery('.mainwp-ui-page .ui.checkbox:not(.not-auto-init)').checkbox();
        jQuery('.mainwp-ui-page .ui.dropdown').filter('[init-value]').each(function(){
            var values = jQuery(this).attr('init-value').split(',');
            jQuery(this).dropdown('set selected',values);
        });
    }

} );


/**
 * MainWP Child Scan
 **/

jQuery( document ).on( 'click', '.mwp-child-scan', function () {
    mwp_start_childscan();
} );
var childsToScan = [ ];
mwp_start_childscan = function ()
{
    jQuery( '#mwp_child_scan_childsites tr' ).each( function () {
        var id = jQuery( this ).attr( 'siteid' );
        if ( id == undefined || id == '' )
            return;
        childsToScan.push( id );
    } );

    mwp_childscan_next();
};

mwp_childscan_next = function ()
{
    if ( childsToScan.length == 0 )
        return;

    var childId = childsToScan.shift();

    jQuery( 'tr[siteid="' + childId + '"]' ).children().last().html( 'Scanning' );

    var data = mainwp_secure_data( {
        action: 'mainwp_childscan',
        childId: childId
    } );

    jQuery.ajax( {
        type: 'POST',
        url: ajaxurl,
        data: data,
        success: function ( pId ) {
            return function ( response ) {
                var tr = jQuery( 'tr[siteid="' + pId + '"]' );
                if ( response.success ) {
                    tr.children().last().html( response.success );
                    tr.attr( 'siteid', '' );
                } else if ( response.error ) {
                    tr.children().last().html( 'Error: ' + response.error );
                } else {
                    tr.children().last().html( 'Error while contacting site!' );
                }
                mwp_childscan_next();
            }
        }( childId ),
        error: function ( pId ) {
            return function () {
                jQuery( 'tr[siteid="' + pId + '"]' ).children().last().html( 'Error while contacting site!' );
                mwp_childscan_next();
            }
        }( childId ),
        dataType: 'json'
    } );
};

jQuery( document ).ready( function () {
    if ( typeof postboxes !== "undefined" && typeof mainwp_postbox_page !== "undefined" ) {
        postboxes.add_postbox_toggles( mainwp_postbox_page );
    }
} );

jQuery( document ).on( 'click', '.close.icon', function () {
    jQuery( this ).parent().hide();
} );
