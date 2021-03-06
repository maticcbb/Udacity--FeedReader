/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */

$(function () {
    
    // NEW TEST SUITE 'RSS Feeds'

    describe('RSS Feeds',  () => {
        
        let feedCheck, //declare variables
            menuTest;

        beforeEach( () => {
            feedCheck = new FeedsCheck(); //making objects
            menuTest = new MenuCheck();
        });

        it('are defined',() => {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


         /* using method from FeedsCheck.js  to test  that loops through each feed
          * in the allFeeds object and ensures it has a URL defined
          * and that the URL is not empty. */

        it('all URLs defined and checked',() => {
            feedCheck.urlCheck(allFeeds);
            expect(feedCheck.checked_url).toBe(true);

        })

          /* using method from FeedsCheck.js  to test names that loops through each feed
           * in the allFeeds object and ensures it has a name defined
           *  and that the name is not empty. */

        it('all name defined and checked ',() => {
            feedCheck.nameCheck(allFeeds);
            expect(feedCheck.checked_name).toBe(true);
        })
       
    });

    // NEW TEST SUITE 'The menu'

    describe('The menu',() => {

        var menuTest;    //declaring variable

        beforeEach(() => {

            menuTest = new MenuCheck();  // making the object from MenuCheck.js
        });

        // test that ensures the menu element is hidden by default.
         
        it('menu is hidden by default',() => {
            //methode from MenuCheck.js that toggle menu button
            menuTest.toggle();               
            expect($('body').hasClass('menu-hidden')).toBe(false);
            menuTest.toggle();

        })

         // that ensures the menu changes visibility when the menu icon is clicked.

        it('menu toggle is working properly', () => {

            //methode from MenuCheck.js that toggle menu button
            menuTest.toggle();
            expect($('body').hasClass('menu-hidden')).toBe(false);

            //methode from MenuCheck.js that toggle menu button
             menuTest.toggle();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        })

    });


    // NEW TEST SUITE 'Initial Entries'

    describe('Initial Entries' , () => {
 
        beforeEach((done) => { 
            loadFeed(0, () => {
            done();
        });
    });

    //test that ensures when the loadFeed function is called and completes its work

        it( 'a single .entry element within the.feed container after loadFeed() is called' ,  ((done) => {
            var numberEntries = document.querySelector('.feed').getElementsByClassName('entry').length;
            expect(numberEntries).toBeGreaterThan(0);
            done();
        }));

    })

    // NEW TEST SUITE 'New Feed Selection' 

    describe('New Feed Selection' , () => {

        var initFeedSelection;
        beforeEach((done) => {
            loadFeed(0,() => {
                initFeedSelection = document.querySelector('.feed').innerHTML;

                loadFeed(1, () => {
                    done();
                });
            });
        });

    //test that ensures when a new feed is loaded by the loadFeed function that the content actually changes

        it('loadFeed function content changes' , (done) => {
            var newFeedSelection = document.querySelector('.feed').innerHTML;
            expect(initFeedSelection).not.toBe(newFeedSelection);
            done();
        });

    });
    
}());