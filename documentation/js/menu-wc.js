'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">geeksreads documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="dependencies.html" data-type="chapter-link">
                                <span class="icon ion-ios-list"></span>Dependencies
                            </a>
                        </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse" ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-896192d8d4ffb3e45df33c071abdbc87"' : 'data-target="#xs-components-links-module-AppModule-896192d8d4ffb3e45df33c071abdbc87"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-896192d8d4ffb3e45df33c071abdbc87"' :
                                            'id="xs-components-links-module-AppModule-896192d8d4ffb3e45df33c071abdbc87"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BookAuthorComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BookAuthorComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BookCommentGuestComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BookCommentGuestComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BookCommentUserComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BookCommentUserComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BookComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BookComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BookDetailsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BookDetailsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BookEntityComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BookEntityComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BookSuggestionComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BookSuggestionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BookSuggestionOtherComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BookSuggestionOtherComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FooterComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FooterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GenreComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">GenreComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GenreRowComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">GenreRowComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GenresComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">GenresComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HomepageComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HomepageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NavBarComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NavBarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NewsfeedComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NewsfeedComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NewsfeedPostComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NewsfeedPostComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProfileBookEntityComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProfileBookEntityComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProfileComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProfileComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProfileEditComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProfileEditComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProfileEntityComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProfileEntityComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SignInComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SignInComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SignOutComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SignOutComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SignUpComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SignUpComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/MaterialModule.html" data-type="entity-link">MaterialModule</a>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AuthorDetails_Service.html" data-type="entity-link">AuthorDetails_Service</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/BookInformation_Service.html" data-type="entity-link">BookInformation_Service</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/BookTitle_Service.html" data-type="entity-link">BookTitle_Service</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CountBooksService.html" data-type="entity-link">CountBooksService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GenreDetails_Service.html" data-type="entity-link">GenreDetails_Service</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SuggestedauthorBook_Service.html" data-type="entity-link">SuggestedauthorBook_Service</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SuggestedBook_Service.html" data-type="entity-link">SuggestedBook_Service</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/Titles_Service.html" data-type="entity-link">Titles_Service</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/AuthorDetails.html" data-type="entity-link">AuthorDetails</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BookDetails.html" data-type="entity-link">BookDetails</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Bookinformation.html" data-type="entity-link">Bookinformation</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Genredetails.html" data-type="entity-link">Genredetails</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ListOfBooks.html" data-type="entity-link">ListOfBooks</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SuggestedAuthorBookDetails.html" data-type="entity-link">SuggestedAuthorBookDetails</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SuggestedBookDetails.html" data-type="entity-link">SuggestedBookDetails</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/User.html" data-type="entity-link">User</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});