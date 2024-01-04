setTimeout(() => {

    // const
    //     SimpleBar = '',
    //     Splide = '',
    //     Datepicker = '',
    //     ClipboardJS = '',
    //     SlimSelect = '';
    const
        body = document.querySelector('body'),
        html = document.querySelector('html'),
        aside = document.querySelector('aside'),
        main = document.querySelector('main'),
        menu = document.querySelectorAll('.aside, .aside__burger, body'),
        header = document.querySelector('.header');


// =-=-=-=-=-=-=-=-=-=- <image-aspect-ratio> -=-=-=-=-=-=-=-=-=-=-

    const imageAspectRatio = document.querySelectorAll('.image-aspect-ratio, figure');
    imageAspectRatio.forEach(imageAspectRatio => {
        const img = imageAspectRatio.querySelector('img'), style = getComputedStyle(imageAspectRatio);
        if (img) {
            if (img.getAttribute('width') && img.getAttribute('height') && style.position == "relative")
                imageAspectRatio.style.setProperty('--padding-aspect-ratio', Number(img.getAttribute('height')) / Number(img.getAttribute('width')) * 100 + '%');
        }

    })

// =-=-=-=-=-=-=-=-=-=- </image-aspect-ratio> -=-=-=-=-=-=-=-=-=-=-

    /* body.style.overflowY = 'auto';
    body.scrollTop = 0;
    html.scrollTop = 0; */

// =-=-=-=-=-=-=-=-=-=-=-=- <click-events> -=-=-=-=-=-=-=-=-=-=-=-=

    let dropDownArray = [];

    let dropDownAbsoluteInterval = 0;

    document.querySelectorAll('.drop-down-absolute').forEach(dropDown => {

        const block = dropDown.querySelector('.drop-down-absolute__block');
        block.style.display = 'none';
        body.append(block);

    })

    setInterval(() => {
        document.querySelectorAll('.drop-down-absolute__block.is-active').forEach(block => {

            const target = document.querySelector(`[data-drop-down-target="${block.getAttribute('id')}"]`);

            //block.style.setProperty('--x', getCoords(target).left + 'px');
            block.style.setProperty('--y', getCoords(target).top + target.offsetHeight + 'px');

        })
    }, 10)


    let asideTimeout;
    body.addEventListener('click', function (event) {

        function $(elem) {
            return event.target.closest(elem)
        }


        // =-=-=-=-=-=-=-=-=-=-=-=- <drop-down-absolute> -=-=-=-=-=-=-=-=-=-=-=-=

        const dropDownAbsoluteTarget = $(".drop-down-absolute__target")
        if (dropDownAbsoluteTarget) {

            if (dropDownAbsoluteTarget.classList.contains('is-active')) {

                document.querySelectorAll('.drop-down-absolute__target.is-active').forEach(target => {
                    target.classList.remove('is-active')
                })

                document.querySelectorAll('.drop-down-absolute__block.is-active').forEach(block => {
                    block.classList.remove('is-active');
                })

                body.style.removeProperty('--drop-down-size');

            } else {

                document.querySelectorAll('.drop-down-absolute__target.is-active').forEach(target => {
                    target.classList.remove('is-active')
                })

                document.querySelectorAll('.drop-down-absolute__block.is-active').forEach(block => {
                    block.classList.remove('is-active');
                })

                body.style.removeProperty('--drop-down-size');

                const block = document.querySelector(`#${dropDownAbsoluteTarget.dataset.dropDownTarget}`);
                block.style.removeProperty('display')


                if (block.classList.contains('is-right-default')) {
                    block.style.setProperty('--x', windowSize - getCoords(dropDownAbsoluteTarget).left - dropDownAbsoluteTarget.offsetWidth + 'px');
                } else {
                    if (getCoords(dropDownAbsoluteTarget).left + block.offsetWidth + 20 > windowSize) {
                        block.style.setProperty('--x', '15px');
                        block.classList.add('is-right');
                    } else {
                        block.classList.remove('is-right');
                        block.style.setProperty('--x', getCoords(dropDownAbsoluteTarget).left + 'px');
                    }
                }


                block.style.setProperty('--y', getCoords(dropDownAbsoluteTarget).top + dropDownAbsoluteTarget.offsetHeight + 'px');

                const asideHeight = (windowSize < 992 && aside) ? 70 : 0;
                const targetTop = main.querySelector('.simplebar-content-wrapper').scrollTop + asideHeight + getCoords(dropDownAbsoluteTarget).top

                setTimeout(() => {
                    dropDownAbsoluteTarget.classList.toggle('is-active');
                    block.classList.toggle('is-active');

                    setTimeout(() => {
                        const topCoords = targetTop + dropDownAbsoluteTarget.offsetHeight + block.offsetHeight;

                        if (topCoords + 25 > main.querySelector('.simplebar-content').offsetHeight) {
                            body.style.setProperty('--drop-down-size', topCoords + 50 - main.querySelector('.simplebar-content').offsetHeight + 'px');
                        }
                    }, 100)
                }, 0)
            }

        } else if (!$('.drop-down-absolute') && !$('.drop-down-absolute__block')) {
            document.querySelectorAll('.drop-down-absolute__target.is-active').forEach(target => {
                target.classList.remove('is-active')
            })

            document.querySelectorAll('.drop-down-absolute__block.is-active').forEach(block => {
                block.classList.remove('is-active');
            })

            body.style.removeProperty('--drop-down-size');
        }

        // =-=-=-=-=-=-=-=-=-=-=-=- </drop-down-absolute> -=-=-=-=-=-=-=-=-=-=-=-=


        // =-=-=-=-=-=-=-=-=-=-=-=- <menu-in-header> -=-=-=-=-=-=-=-=-=-=-=-=

        if ($('.aside__burger')) {

            menu.forEach(element => {
                element.classList.toggle('is-mobile-menu-active')
            })

        }

        // =-=-=-=-=-=-=-=-=-=-=-=- </menu-in-header> -=-=-=-=-=-=-=-=-=-=-=-=


        // =-=-=-=-=-=-=-=-=-=-=-=- <drop-down> -=-=-=-=-=-=-=-=-=-=-=-=

        const dropDownTarget = $(".drop-down__target")
        if (dropDownTarget) {

            const parent = dropDownTarget.closest('.drop-down');
            if (parent.classList.contains('is-active')) {
                document.querySelectorAll('.drop-down.is-active').forEach(dropDown => {
                    dropDown.classList.remove('is-active');
                })
            } else {
                document.querySelectorAll('.drop-down.is-active').forEach(dropDown => {
                    dropDown.classList.remove('is-active');
                })

                parent.classList.add('is-active');
            }


        } else if (!$('.drop-down') || $('.drop-down__list a')) {
            document.querySelectorAll('.drop-down.is-active').forEach(dropDown => {
                dropDown.classList.remove('is-active');
            })
        }

        // =-=-=-=-=-=-=-=-=-=-=-=- </drop-down> -=-=-=-=-=-=-=-=-=-=-=-=


        // =-=-=-=-=-=-=-=-=-=-=-=- <aside-slide-toggle> -=-=-=-=-=-=-=-=-=-=-=-=

        const asideSlideToggle = $(".aside__slide-toggle")
        if (asideSlideToggle) {

            clearTimeout(asideTimeout);
            body.style.setProperty('--transition-width', 'max-width .5s ease, width .5s ease, left .5s ease');

            /* aside.querySelector('.aside__body--wrapper').classList.add('fade-out-2');
            setTimeout(() => {
                aside.querySelector('.aside__body--wrapper').classList.remove('fade-in-2');
            },0) */

            /* aside.querySelectorAll('.aside__nav span').forEach(span => {
                span.style.width = span.offsetWidth + 'px';
            }) */

            /* aside.querySelectorAll('.aside__user--name').forEach(name => {
                name.style.width = name.offsetWidth + 'px';
            }) */

            setTimeout(() => {

                aside.classList.toggle('is-min');

                if (aside.classList.contains('is-min')) {
                    if (aside) html.style.setProperty('--aside-width', 65 + 'px');
                    localStorage.setItem('ic11-aside-min', true);
                } else {
                    if (aside) html.style.setProperty('--aside-width', 230 + 'px');
                    localStorage.setItem('ic11-aside-min', false);
                }

                if (aside.classList.contains('is-min')) {
                    aside.classList.add('is-min-2');
                    setTimeout(() => {
                        body.style.removeProperty('--transition-width');
                    }, 500)
                    /* setTimeout(() => {
                        aside.querySelector('.aside__body--wrapper').classList.add('fade-in-2');
                        setTimeout(() => {
                            aside.querySelector('.aside__body--wrapper').classList.remove('fade-out-2');
                        },0)
                    },500) */
                } else {
                    asideTimeout = setTimeout(() => {
                        aside.classList.toggle('is-min-2');
                        body.style.removeProperty('--transition-width');
                        /* aside.querySelector('.aside__body--wrapper').classList.add('fade-in-2');
                        setTimeout(() => {
                            aside.querySelector('.aside__body--wrapper').classList.remove('fade-out-2');
                        },0) */
                    }, 500)
                }

            }, 300)

        }

        // =-=-=-=-=-=-=-=-=-=-=-=- </aside-slide-toggle> -=-=-=-=-=-=-=-=-=-=-=-=


        // =-=-=-=-=-=-=-=-=-=-=-=- <aside-nav> -=-=-=-=-=-=-=-=-=-=-=-=

        const asideNavButton = $(".aside__nav button")
        if (asideNavButton) {

            asideNavButton.classList.toggle('is-active')
            if (asideNavButton.classList.contains('is-active')) {
                const div = asideNavButton.nextElementSibling.querySelector('div');

            }

        }

        // =-=-=-=-=-=-=-=-=-=-=-=- </aside-nav> -=-=-=-=-=-=-=-=-=-=-=-=


        // =-=-=-=-=-=-=-=-=-=-=-=- <section-table> -=-=-=-=-=-=-=-=-=-=-=-=

        const sectionTableSearchSubmit = $(".section-table__search--submit")
        if (sectionTableSearchSubmit) {

            if (window.innerWidth < 992 && !sectionTableSearchSubmit.parentElement.classList.contains('is-active') && !sectionTableSearchSubmit.parentElement.classList.contains('is-alternative')) {
                event.preventDefault();
                sectionTableSearchSubmit.parentElement.classList.add('is-active')
            }

        } else if (!$('.section-table__search')) {
            document.querySelectorAll('.section-table__search.is-active').forEach(search => {
                search.classList.remove('is-active')
            })
        }

        // =-=-=-=-=-=-=-=-=-=-=-=- </section-table> -=-=-=-=-=-=-=-=-=-=-=-=


        // =-=-=-=-=-=-=-=-=-=-=-=- <drop-down-2> -=-=-=-=-=-=-=-=-=-=-=-=

        const dataDropDownTarget = $(".drop-down-2")
        if (dataDropDownTarget && getDeviceType() != "desktop") {

            if (dataDropDownTarget.classList.contains('is-active-drop-down')) {
                /* document.querySelectorAll('.drop-down-2.is-active-drop-down').forEach(dropDownActive => {
                    dropDownActive.classList.remove('is-active-drop-down')
                    if(dropDownActive.closest('.section-table__row-block')) dropDownActive.closest('.section-table__row-block').classList.remove('on-active');
                }) */
                document.querySelectorAll('.drop-down-2__block.is-active').forEach(block => {
                    setTimeout(() => {
                        block.classList.remove('is-active');
                    }, 0)
                    block.classList.add('is-hidden')
                })

                document.querySelectorAll('.drop-down-2.is-active-drop-down').forEach(dropDownActive => {
                    dropDownActive.classList.remove('is-active-drop-down')
                    if (dropDownActive.closest('.section-table__row-block')) dropDownActive.closest('.section-table__row-block').classList.remove('on-active');
                })

            } else {

                if (document.querySelector('.drop-down-2.is-active-drop-down')) {

                    document.querySelectorAll('.drop-down-2.is-active-drop-down').forEach(dropDownActive => {
                        dropDownActive.classList.remove('is-active-drop-down')
                        if (dropDownActive.closest('.section-table__row-block')) dropDownActive.closest('.section-table__row-block').classList.remove('on-active');
                    })


                    document.querySelectorAll('.drop-down-2__block.is-active').forEach(block => {
                        setTimeout(() => {
                            block.classList.add('is-hidden')
                        }, 0)

                        block.classList.remove('is-active')
                    })

                } else {
                    dataDropDownTarget.classList.add('is-active-drop-down')
                    if (dataDropDownTarget.closest('.section-table__row-block')) dataDropDownTarget.closest('.section-table__row-block').classList.add('on-active');

                    if (dataDropDownTarget.querySelector('.drop-down-2__block')) {
                        const block = dataDropDownTarget.querySelector('.drop-down-2__block');
                        block.setAttribute('id', "drop-down-block-" + dropDownArray.length);
                        dataDropDownTarget.setAttribute('data-drop-down-target', "drop-down-block-" + dropDownArray.length);
                        dropDownArray.push(block);
                        body.append(block);
                    }

                    const block = document.querySelector(`#${dataDropDownTarget.dataset.dropDownTarget}`);

                    if (event.pageY + block.offsetHeight > window.innerHeight) {
                        block.style.setProperty('--y', event.pageY - block.offsetHeight + 'px');
                    } else {
                        block.style.setProperty('--y', event.pageY + 'px');
                    }

                    if (event.pageX + block.offsetWidth > windowSize) {
                        if (windowSize > 992) {
                            block.style.setProperty('--x', window.innerWidth - block.offsetWidth - 20 + 'px');
                        } else {
                            block.style.setProperty('--x', window.innerWidth - block.offsetWidth + 40 + 'px');
                        }
                    } else {
                        block.style.setProperty('--x', Math.max(100, Math.min(window.innerWidth - 70 - 20, event.pageX)) + 'px');
                    }

                    setTimeout(() => {
                        block.classList.remove('is-hidden')
                        setTimeout(() => {
                            block.classList.add('is-active')
                        }, 0)
                    }, 0)
                }
            }

        } else if (document.querySelector('.drop-down-2__block.is-active')) {
            document.querySelectorAll('.drop-down-2__block.is-active').forEach(block => {
                setTimeout(() => {
                    block.classList.remove('is-active');
                }, 0)
                block.classList.add('is-hidden')
            })

            document.querySelectorAll('.drop-down-2.is-active-drop-down').forEach(dropDownActive => {
                dropDownActive.classList.remove('is-active-drop-down')
                if (dropDownActive.closest('.section-table__row-block')) dropDownActive.closest('.section-table__row-block').classList.remove('on-active');
            })
        }

        // =-=-=-=-=-=-=-=-=-=-=-=- </drop-down-2> -=-=-=-=-=-=-=-=-=-=-=-=


        // =-=-=-=-=-=-=-=-=-=-=-=- <password-input> -=-=-=-=-=-=-=-=-=-=-=-=

        const passwordInputVisibleToggle = $(".password-input__visible-toggle")
        if (passwordInputVisibleToggle) {

            const input = passwordInputVisibleToggle.parentElement.querySelector('.password-input');
            if (input) {
                passwordInputVisibleToggle.classList.toggle('is-active');
                if (passwordInputVisibleToggle.classList.contains('is-active')) {
                    input.type = 'text';
                } else {
                    input.type = 'password';
                }
            }

        }

        // =-=-=-=-=-=-=-=-=-=-=-=- </password-input> -=-=-=-=-=-=-=-=-=-=-=-=


        // =-=-=-=-=-=-=-=-=-=-=-=- <notification> -=-=-=-=-=-=-=-=-=-=-=-=

        const notificationTarget = $(".notification__target.is-has-notice")
        if (notificationTarget) {

            notificationTarget.classList.remove('is-has-notice')

        }

        // =-=-=-=-=-=-=-=-=-=-=-=- </notification> -=-=-=-=-=-=-=-=-=-=-=-=


        // =-=-=-=-=-=-=-=-=-=-=-=- <down-sidebar> -=-=-=-=-=-=-=-=-=-=-=-=

        const downSidebarArrowTarget = $(".down-sidebar__arrow-target, .down-sidebar__comments-target, .down-sidebar__total-target")
        if (downSidebarArrowTarget) {

            const sideBar = downSidebarArrowTarget.closest('.down-sidebar'),
                targetPlace = sideBar.querySelector('.down-sidebar__target-place'),
                row = sideBar.querySelector('.down-sidebar__row');

            sideBar.classList.toggle('is-active-2');
            if (sideBar.classList.contains('is-active-2')) {

                row.classList.remove('fade-out');
                targetPlace.style.removeProperty('--opacity');
                targetPlace.classList.add('fade-out');
                targetPlace.classList.remove('fade-in');

                setTimeout(() => {
                    sideBar.classList.toggle('is-active');

                    row.style.setProperty('--opacity', 0);
                    row.classList.add('fade-in');
                    row.classList.remove('fade-out');

                    setTimeout(() => {
                        html.style.setProperty('--down-sidebar-height', downSidebar.offsetHeight + 'px');
                    }, 500)
                }, 300)

            } else if (!sideBar.classList.contains('is-active-2')) {

                targetPlace.classList.remove('fade-out');
                row.style.removeProperty('--opacity');
                row.classList.add('fade-out');

                setTimeout(() => {
                    targetPlace.style.setProperty('--opacity', 0);
                    sideBar.classList.toggle('is-active');

                    setTimeout(() => {
                        targetPlace.classList.add('fade-in');
                        targetPlace.classList.remove('fade-out');
                    }, 300)

                    setTimeout(() => {
                        html.style.setProperty('--down-sidebar-height', downSidebar.offsetHeight + 'px');
                    }, 500)
                }, 300)

            }

        }

        // =-=-=-=-=-=-=-=-=-=-=-=- </down-sidebar> -=-=-=-=-=-=-=-=-=-=-=-=


        // =-=-=-=-=-=-=-=-=-=-=-=- <down-sidebar-chat> -=-=-=-=-=-=-=-=-=-=-=-=

        const downSidebarChatItemAnswer = $(".down-sidebar__chat-item--answer")
        if (downSidebarChatItemAnswer) {

            const chat = downSidebarChatItemAnswer.closest('.down-sidebar__chat'),
                field = chat.querySelector('.down-sidebar__chat-user-panel input'),
                author = downSidebarChatItemAnswer.closest('.down-sidebar__chat-item');

            field.value = '@' + author.dataset.author + '. '
            field.focus();

        }

        // =-=-=-=-=-=-=-=-=-=-=-=- </down-sidebar-chat> -=-=-=-=-=-=-=-=-=-=-=-=


        // =-=-=-=-=-=-=-=-=-=-=-=- <block-is-active> -=-=-=-=-=-=-=-=-=-=-=-=

        const addIsActive = $(".add-is-active")
        if (addIsActive) {

            const block = addIsActive.closest('.block-for-is-active');

            block.children[0].style.removeProperty('--opacity');
            block.children[0].style.removeProperty('--visibility');

            block.children[0].classList.add('fade-out');
            setTimeout(() => {
                block.children[0].classList.remove('fade-in');
                block.children[1].classList.remove('fade-out');
            }, 0)

            setTimeout(() => {
                block.classList.add('is-active');
                block.children[0].classList.remove('fade-out');
                block.children[0].style.removeProperty('--opacity');
                block.children[0].style.removeProperty('--visibility');
                block.children[1].style.setProperty('--opacity', 0);
                block.children[1].style.setProperty('--visibility', "hidden");
                block.children[1].classList.add('fade-in');
            }, 300)

        }

        const removeIsActive = $(".remove-is-active")
        if (removeIsActive) {

            const block = removeIsActive.closest('.block-for-is-active');

            block.children[1].style.removeProperty('--opacity');
            block.children[1].style.removeProperty('--visibility');
            block.children[1].classList.add('fade-out');

            setTimeout(() => {
                block.classList.remove('is-active');
                block.children[1].classList.remove('fade-out');
                block.children[1].style.removeProperty('--opacity');
                block.children[1].style.removeProperty('--visibility');
                block.children[0].style.setProperty('--opacity', 0);
                block.children[0].style.setProperty('--visibility', "hidden");
                block.children[0].classList.add('fade-in');
            }, 300)

        }

        const addActiveChangeTitle = $('[data-add-active-change-title]');
        if (addActiveChangeTitle) {
            const title = document.querySelector(`#${addActiveChangeTitle.dataset.addActiveChangeTitle}`);
            if (title) title.classList.add('is-active');
        }

        const removeActiveChangeTitle = $('[data-remove-active-change-title]');
        if (removeActiveChangeTitle) {
            const title = document.querySelector(`#${removeActiveChangeTitle.dataset.removeActiveChangeTitle}`);
            if (title) title.classList.remove('is-active');
        }

        // =-=-=-=-=-=-=-=-=-=-=-=- </block-is-active> -=-=-=-=-=-=-=-=-=-=-=-=


        // =-=-=-=-=-=-=-=-=-=-=-=- <message> -=-=-=-=-=-=-=-=-=-=-=-=

        const messageClose = $(".message__close")
        if (messageClose) {

            const message = messageClose.closest('.message');
            message.classList.add('fade-out');

            const date = new Date();
            date.setMonth(date.getMonth() + 1);

            if (message.classList.contains('deadline-message')) {
                localStorage.setItem('ic11-deadline', date.getMonth());
            }

            setTimeout(() => {
                message.remove();
            }, 300)

        }

        // =-=-=-=-=-=-=-=-=-=-=-=- </message> -=-=-=-=-=-=-=-=-=-=-=-=


        // =-=-=-=-=-=-=-=-=-=-=-=- <summary-item> -=-=-=-=-=-=-=-=-=-=-=-=

        const summaryItemTarget = $(".summary-item__target--toggle")
        if (summaryItemTarget) {

            const summaryItem = summaryItemTarget.closest('.summary-item');
            if (summaryItem.classList.contains('is-active')) {
                document.querySelectorAll('.summary-item.is-active').forEach(item => {
                    item.classList.remove('is-active');
                })
            } else {
                document.querySelectorAll('.summary-item.is-active').forEach(item => {
                    item.classList.remove('is-active');
                })

                summaryItem.classList.add('is-active');
            }

        }

        // =-=-=-=-=-=-=-=-=-=-=-=- </summary-item> -=-=-=-=-=-=-=-=-=-=-=-=


        // =-=-=-=-=-=-=-=-=-=-=-=- <summary-favorite> -=-=-=-=-=-=-=-=-=-=-=-=

        const summaryItemUserFavorite = $(".summary-item__user--favorite")
        if (summaryItemUserFavorite) {

            summaryItemUserFavorite.classList.toggle('is-active')

        }

        // =-=-=-=-=-=-=-=-=-=-=-=- </summary-favorite> -=-=-=-=-=-=-=-=-=-=-=-=

    })

// =-=-=-=-=-=-=-=-=-=-=-=- </click-events> -=-=-=-=-=-=-=-=-=-=-=-=


// =-=-=-=-=-=-=-=-=-=-=-=- <custom-context-menu> -=-=-=-=-=-=-=-=-=-=-=-=

    window.addEventListener('contextmenu', function (event) {

        function $(elem) {
            return event.target.closest(elem)
        }

        // =-=-=-=-=-=-=-=-=-=-=-=- <drop-down-2> -=-=-=-=-=-=-=-=-=-=-=-=

        const dataDropDownTarget = $(".drop-down-2")
        if (dataDropDownTarget) {

            event.preventDefault();

            if (dataDropDownTarget.classList.contains('is-active-drop-down')) {
                /* document.querySelectorAll('.drop-down-2.is-active-drop-down').forEach(dropDownActive => {
                    dropDownActive.classList.remove('is-active-drop-down')
                    if(dropDownActive.closest('.section-table__row-block')) dropDownActive.closest('.section-table__row-block').classList.remove('on-active');
                }) */
                document.querySelectorAll('.drop-down-2__block.is-active').forEach(block => {
                    setTimeout(() => {
                        block.classList.remove('is-active');
                    }, 0)
                    block.classList.add('is-hidden')
                })

                document.querySelectorAll('.drop-down-2.is-active-drop-down').forEach(dropDownActive => {
                    dropDownActive.classList.remove('is-active-drop-down')
                    if (dropDownActive.closest('.section-table__row-block')) dropDownActive.closest('.section-table__row-block').classList.remove('on-active');
                })
            } else {
                document.querySelectorAll('.drop-down-2.is-active-drop-down').forEach(dropDownActive => {
                    dropDownActive.classList.remove('is-active-drop-down')
                    if (dropDownActive.closest('.section-table__row-block')) dropDownActive.closest('.section-table__row-block').classList.remove('on-active');
                })

                dataDropDownTarget.classList.add('is-active-drop-down')
                if (dataDropDownTarget.closest('.section-table__row-block')) dataDropDownTarget.closest('.section-table__row-block').classList.add('on-active');

                document.querySelectorAll('.drop-down-2__block.is-active').forEach(block => {
                    setTimeout(() => {
                        block.classList.add('is-hidden')
                    }, 0)

                    block.classList.remove('is-active')

                })

                if (dataDropDownTarget.querySelector('.drop-down-2__block')) {
                    const block = dataDropDownTarget.querySelector('.drop-down-2__block');
                    block.setAttribute('id', "drop-down-block-" + dropDownArray.length);
                    dataDropDownTarget.setAttribute('data-drop-down-target', "drop-down-block-" + dropDownArray.length);
                    dropDownArray.push(block);
                    body.append(block);
                }

                const block = document.querySelector(`#${dataDropDownTarget.dataset.dropDownTarget}`);


                if (event.pageY + block.offsetHeight > window.innerHeight) {
                    block.style.setProperty('--y', event.pageY - block.offsetHeight + 'px');
                } else {
                    block.style.setProperty('--y', event.pageY + 'px');
                }

                if (event.pageX + block.offsetWidth > windowSize) {
                    if (windowSize > 992) {
                        block.style.setProperty('--x', window.innerWidth - block.offsetWidth - 20 + 'px');
                    } else {
                        block.style.setProperty('--x', window.innerWidth - block.offsetWidth + 40 + 'px');
                    }
                } else {
                    block.style.setProperty('--x', Math.max(100, Math.min(window.innerWidth - 70 - 20, event.pageX)) + 'px');
                }

                setTimeout(() => {
                    block.classList.remove('is-hidden')
                    setTimeout(() => {
                        block.classList.add('is-active')
                    }, 0)
                }, 0)
            }

        }

        // =-=-=-=-=-=-=-=-=-=-=-=- </drop-down-2> -=-=-=-=-=-=-=-=-=-=-=-=
    })


// =-=-=-=-=-=-=-=-=-=-=-=- </custom-context-menu> -=-=-=-=-=-=-=-=-=-=-=-=


// =-=-=-=-=-=-=-=-=-=- <Get-device-type> -=-=-=-=-=-=-=-=-=-=-

    const getDeviceType = () => {

        const ua = navigator.userAgent;
        if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
            return "tablet";
        }

        if (
            /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
                ua
            )
        ) {
            return "mobile";
        }
        return "desktop";

    };

// =-=-=-=-=-=-=-=-=-=- </Get-device-type> -=-=-=-=-=-=-=-=-=-=-


// =-=-=-=-=-=-=-=-=-=-=-=- <pointer-leave-after-hover> -=-=-=-=-=-=-=-=-=-=-=-=

    body.addEventListener('pointerover', function (event) {
        if (getDeviceType() == "desktop" && windowSize > 992) {
            const row = event.target.closest('.section-table__row');
            if (row) {
                row.classList.add('is-active');

                const rows = row.closest('.section-table__main').querySelectorAll('.section-table__row');
                const params = row.querySelectorAll('.section-table__param');

                let indexParam = 0;
                params.forEach((param, index) => {
                    if (param == event.target) indexParam = index;
                })

                rows.forEach(eachRow => {

                    if (eachRow != row) {
                        eachRow.classList.remove('is-active');
                        if (eachRow.closest('.section-table__row-block')) eachRow.closest('.section-table__row-block').classList.remove('on-hover');
                    }

                    eachRow.querySelectorAll('.section-table__param').forEach((param, index) => {
                        if (index == indexParam && !param.classList.contains('is-none-vertical-hover')) {
                            param.classList.add('is-active')
                        } else {
                            param.classList.remove('is-active')
                        }
                    })
                })

                if (row.closest('.section-table__row-block')) row.closest('.section-table__row-block').classList.add('on-hover');

            }

        }
    })

// =-=-=-=-=-=-=-=-=-=-=-=- </pointer-leave-after-hover> -=-=-=-=-=-=-=-=-=-=-=-=


// =-=-=-=-=-=-=-=-=-=-=-=- <accent-col-in-table> -=-=-=-=-=-=-=-=-=-=-=-=

    document.querySelectorAll('.section-table__main').forEach((main, index) => {

        main.setAttribute('id', 'section-table-' + (index + 1));
        const th = main.querySelectorAll('.section-table__head-th');
        let styles = '';
        th.forEach((th, thIndex) => {
            if (th.classList.contains('is-accent-col')) styles += `#section-table-${index + 1} .section-table__param:nth-child(${thIndex + 1}) {background: var(--col-accent);}`;
        })

        main.insertAdjacentHTML("afterbegin", `<style>${styles}</style>`)
        const tableBody = main.querySelectorAll('.section-table__body');

        tableBody.forEach(tableBody => {
            const rows = tableBody.querySelectorAll('.section-table__row');
            if (!main.classList.contains('table-projects')) {

                rows.forEach((row, index) => {
                    if (index % 2) {
                        row.classList.add('is-even-mode');
                    }
                })

            }

            tableBody.addEventListener('pointerleave', function (event) {

                if (getDeviceType() == "desktop") {

                    const rows = main.querySelectorAll('.section-table__row.is-active'),
                        activeParams = main.querySelectorAll('.section-table__param.is-active');

                    if (rows[0]) {

                        rows.forEach(row => {
                            row.classList.remove('is-active');
                            if (row.closest('.section-table__row-block')) row.closest('.section-table__row-block').classList.remove('on-hover');
                        })

                        activeParams.forEach((param, index) => {
                            param.classList.remove('is-active')
                        })

                    }

                }
            })

        })

    })

// =-=-=-=-=-=-=-=-=-=-=-=- </accent-col-in-table> -=-=-=-=-=-=-=-=-=-=-=-=


// =-=-=-=-=-=-=-=-=-=-=-=- <input-append-add-text> -=-=-=-=-=-=-=-=-=-=-=-=

    document.querySelectorAll('.input-number').forEach(inputNumber => {

        inputNumber.addEventListener('input', function (event) {

            let result = inputNumber.value.replace(/[\D]+/g, '');
            /* console.log(result)

            if(event.inputType == "deleteContentBackward") {
                result = result.slice(0, -1);
            } */

            inputNumber.value = result;

            if (result) {
                inputNumber.value = result + ' ' + inputNumber.dataset.addText;
                inputNumber.setSelectionRange(result.length, result.length);
            }

        })

        inputNumber.addEventListener('click', function (event) {

            let result = inputNumber.value.replace(/[\D]+/g, '');
            inputNumber.setSelectionRange(result.length, result.length);

        })

        inputNumber.addEventListener('focus', function (event) {

            let result = inputNumber.value.replace(/[\D]+/g, '');
            inputNumber.setSelectionRange(result.length, result.length);

        })

        inputNumber.addEventListener('blur', function (event) {

            let result = inputNumber.value.replace(/[\D]+/g, '');

            if (result && Number(result) >= 99) {
                inputNumber.value = 99 + ' ' + inputNumber.dataset.addText;
            }

        })
    })

// =-=-=-=-=-=-=-=-=-=-=-=- </input-append-add-text> -=-=-=-=-=-=-=-=-=-=-=-=


// =-=-=-=-=-=-=-=-=-=-=-=- <get-coords> -=-=-=-=-=-=-=-=-=-=-=-=

    function getCoords(elem) {
        let box = elem.getBoundingClientRect();

        return {
            top: box.top + window.scrollX,
            right: box.right + window.scrollY,
            bottom: box.bottom + window.scrollX,
            left: box.left + window.scrollY
        };
    }

// =-=-=-=-=-=-=-=-=-=-=-=- </get-coords> -=-=-=-=-=-=-=-=-=-=-=-=


// =-=-=-=-=-=-=-=-=-=-=-=- <resize> -=-=-=-=-=-=-=-=-=-=-=-=

    let windowSize = 0;
    const downSidebar = document.querySelector('.down-sidebar');

    let mainScrollbar = new SimpleBar(document.querySelector('.main'), {
        autoHide: false,
    });

    function resize() {

        //html.style.setProperty("--height-header", header.offsetHeight + "px");
        if (downSidebar) html.style.setProperty('--down-sidebar-height', downSidebar.offsetHeight + 'px');

        html.style.setProperty("--vh", window.innerHeight * 0.01 + "px");
        html.style.setProperty("--vw", window.innerWidth * 0.01 + "px");
        if (windowSize != window.innerWidth) {
            html.style.setProperty("--svh", window.innerHeight * 0.01 + "px");
        }

        document.querySelectorAll('.drop-down__block').forEach(dropDown => {

            if (getCoords(dropDown).right > window.innerWidth && !dropDown.closest('.drop-down').classList.contains('is-right-default')) {
                dropDown.closest('.drop-down').classList.add('is-right');
            } else {
                dropDown.closest('.drop-down').classList.remove('is-right');
            }
        })

        windowSize = window.innerWidth;

        document.querySelectorAll('.section-table__main').forEach((main, index) => {

            const rowsBlockList = main.querySelectorAll('.section-table__row-block--list');
            rowsBlockList.forEach(list => {
                const block = list.closest('.section-table__row-block');
                block.style.setProperty('--height', list.offsetHeight + 'px');
                block.style.setProperty('--negative-height', -list.offsetHeight + 'px');
            })

        })

        //mainScrollbar.recalculate();
        //mainScrollbar = new SimpleBar(document.querySelector('.main'));

    }

    resize();

    window.addEventListener('resize', resize)


    if (aside || downSidebar) {
        if (aside && windowSize > 992) html.style.setProperty('--aside-width', aside.offsetWidth + 'px');
        if (downSidebar) html.style.setProperty('--down-sidebar-height', downSidebar.offsetHeight + 'px');
    }


// =-=-=-=-=-=-=-=-=-=-=-=- </resize> -=-=-=-=-=-=-=-=-=-=-=-=


// =-=-=-=-=-=-=-=-=-=-=-=- <slider> -=-=-=-=-=-=-=-=-=-=-=-=

    document.querySelectorAll('.section-table__change-date--slider, .section-table__change-full-date--slider').forEach(sliderElement => {

        const slides = sliderElement.querySelectorAll('.splide__slide');
        //activeSlide = sliderElement.querySelector('.splide__slide.is-disabled').previousElementSibling;

        //activeSlide.classList.add('is-active')

        const slider = new Splide(sliderElement, {

            perPage: 3,
            perMove: 3,
            pagination: false,
            focus: "center",
            gap: 0,

            /* breakpoints: {
                992: {
                    // params
                },

                550: {
                    // params
                }
            } */

        });

        slider.on('mounted', function () {
            slider.root.querySelectorAll('.splide__slide').forEach((slide, index) => {
                if (slide.querySelector('input').checked) {
                    slider.go(index)
                }
            })
        })

        slider.mount();

    })

// =-=-=-=-=-=-=-=-=-=-=-=- </slider> -=-=-=-=-=-=-=-=-=-=-=-=


// =-=-=-=-=-=-=-=-=-=-=-=- <custom-select> -=-=-=-=-=-=-=-=-=-=-=-=

    document.querySelectorAll('.custom-select').forEach(select => {
        new SlimSelect({
            select: select,
            settings: {
                showSearch: false,
            },
            events: {
                beforeChange: (newVal) => {
                    document.querySelector('[data-id="' + newVal[0]['id'] + '"]').closest('.ss-list').style.overflowY = 'hidden';
                },
                afterChange: (newVal) => {
                    const list = document.querySelector('[data-id="' + newVal[0]['id'] + '"]').closest('.ss-list');
                    list.style.overflowY = 'auto';
                    const selected = list.querySelector('.ss-selected');

                    new SimpleBar(document.querySelector('[data-id="' + newVal[0]['id'] + '"]').closest('.ss-list'), {
                        autoHide: false,
                    });

                    if (selected) {
                        list.querySelector('.simplebar-content-wrapper').scrollTop = selected.offsetTop;
                    }
                }
            }
        })
    })

    setTimeout(() => {
        document.querySelectorAll('.ss-list').forEach(select => {

            new SimpleBar(select, {
                autoHide: false,
            });

            const selected = select.querySelector('.ss-selected');
            if (selected) {
                select.querySelector('.simplebar-content-wrapper').scrollTop = selected.offsetTop;
            }
        })
    }, 500)

// =-=-=-=-=-=-=-=-=-=-=-=- </custom-select> -=-=-=-=-=-=-=-=-=-=-=-=


// =-=-=-=-=-=-=-=-=-=-=-=- <popup-checkbox> -=-=-=-=-=-=-=-=-=-=-=-=

    document.querySelectorAll('.popup-checkbox-list').forEach(list => {
        const inputs = list.querySelectorAll('input'),
            checkedList = document.querySelector('#' + list.dataset.checkedListId);
        inputs.forEach(input => {
            input.addEventListener('change', function (event) {
                let allChecked = false;

                if (input.classList.contains('all-check')) {
                    if (input.checked) {
                        allChecked = true;
                        inputs.forEach(input => {
                            if (!input.classList.contains('all-check')) {
                                input.checked = true;
                            }
                        })
                    } else {
                        inputs.forEach(input => {
                            if (!input.classList.contains('all-check')) {
                                input.checked = false;
                            }
                        })
                    }

                } else {
                    inputs.forEach(input => {
                        if (input.classList.contains('all-check')) {
                            input.checked = false;
                        }
                    })
                }

                let counter = 0, noneChecked = true;
                if (allChecked) {

                    noneChecked = false;
                    checkedList.title = checkedList.dataset.allText;
                    checkedList.textContent = checkedList.dataset.allText;

                } else {
                    inputs.forEach(input => {
                        if (input.checked) {
                            noneChecked = false
                            /* const text = input.nextElementSibling.nextElementSibling.textContent;
                            if(counter == 0) {
                                checkedList.title = counter+1;
                                checkedList.textContent = counter+1;
                            } else {
                                checkedList.textContent = counter+1;
                                checkedList.title = counter+1;
                            } */

                            const appendText = (counter + 1 == 1) ? checkedList.dataset['text-1'] : checkedList.dataset['text-2'];

                            checkedList.textContent = counter + 1 + ' ' + appendText;
                            checkedList.title = counter + 1 + ' ' + appendText;
                            //console.log(checkedList.dataset['text-1'])

                            counter++;
                        }
                    })
                }

                if (noneChecked) {
                    checkedList.title = checkedList.dataset.noneText;
                    checkedList.textContent = checkedList.dataset.noneText;
                }
            })
        })

    })

// =-=-=-=-=-=-=-=-=-=-=-=- </popup-checkbox> -=-=-=-=-=-=-=-=-=-=-=-=


// =-=-=-=-=-=-=-=-=-=-=-=- <datepicker> -=-=-=-=-=-=-=-=-=-=-=-=

    document.querySelectorAll('.section-table__change-full-date').forEach(changeFullDate => {
        const targetText = changeFullDate.querySelector('.section-table__change-full-date--target span'),
            months = changeFullDate.querySelector('.section-table__change-full-date--months'),
            years = changeFullDate.querySelector('.section-table__change-full-date--slider');

        let checkedMonth = months.querySelector('input:checked').nextElementSibling.textContent,
            yearChecked = years.querySelector('input:checked').nextElementSibling.textContent;

        months.querySelectorAll('input').forEach(input => {
            input.addEventListener('change', function (event) {
                if (input.checked) {
                    checkedMonth = input.nextElementSibling.textContent;
                    targetText.textContent = checkedMonth + ', ' + yearChecked;
                }
            })
        })

        years.querySelectorAll('input').forEach(input => {
            input.addEventListener('change', function (event) {
                if (input.checked) {
                    yearChecked = input.nextElementSibling.textContent;
                    targetText.textContent = checkedMonth + ', ' + yearChecked;
                }
            })
        })

    })

    const dateInputs = document.querySelectorAll('.date-input');
    dateInputs.forEach(input => {

        const datepicker = new Datepicker(input, {
            todayButton: true,
            prevArrow: `<svg width="7" height="10" viewBox="0 0 7 10"><use xlink:href="${input.dataset.prevArrowPath}"></use></svg>`,
            nextArrow: `<svg width="7" height="10" viewBox="0 0 7 10"><use xlink:href="${input.dataset.nextArrowPath}"></use></svg>`,
            autohide: true,
        });

        input.addEventListener('show', function (event) {
            setTimeout(() => {
                input.classList.add('is-show');
            }, 300)
        })

        input.addEventListener('hide', function (event) {
            input.classList.remove('is-show');
        })

        input.addEventListener('click', function () {
            if (input.classList.contains('is-show')) {
                input.classList.remove('is-show');
                datepicker.hide();
                input.blur()
            }
        })

        const currentDate = new Date(),
            month = currentDate.getMonth() + 1 > 9 ? currentDate.getMonth() + 1 : '0' + (currentDate.getMonth() + 1);

        input.value = month + '/' + currentDate.getDate() + '/' + currentDate.getFullYear();
    })

// =-=-=-=-=-=-=-=-=-=-=-=- </datepicker> -=-=-=-=-=-=-=-=-=-=-=-=


// =-=-=-=-=-=-=-=-=-=-=-=- <generate-time> -=-=-=-=-=-=-=-=-=-=-=-=

    document.querySelectorAll('.section-table__time--block').forEach(block => {

        const fromHours = block.querySelector('.from-hours'),
            fromMinutes = block.querySelector('.from-minutes'),
            toHours = block.querySelector('.to-hours'),
            toMinutes = block.querySelector('.to-minutes');

        const target = block.parentElement.querySelector('.section-table__time--target');

        let nowDate = new Date();

        const selects = block.querySelectorAll('.custom-select');
        selects.forEach(select => {
            select.addEventListener('change', function (event) {

                let startDate = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate(), Number(fromHours.value), Number(fromMinutes.value), 0, 0),
                    endDate = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate(), Number(toHours.value), Number(toMinutes.value), 0, 0);

                let diff = endDate - startDate;
                if (diff <= 0) {
                    endDate = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate() + 1, Number(toHours.value), Number(toMinutes.value), 0, 0);
                }

                diff = endDate - startDate;

                const hours = Math.floor(diff / 1000 / 60 / 60) % 24;

                document.querySelectorAll('.hours-input').forEach(input => {
                    input.value = hours + ' ' + input.dataset.addText;
                })

                target.querySelector('span').textContent = fromHours.value + ':' + fromMinutes.value + ' - ' + toHours.value + ':' + toMinutes.value;
            })
        })

        /* fromHours.addEventListener('change', function (event) {
            let startDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), Number(fromHours.value), Number(fromMinutes.value), 0, 0),
            endDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), Number(toHours.value), Number(toMinutes.value), 0, 0);

            console.log(new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), Number(fromHours.value), Number(fromMinutes.value), 0, 0));

        }) */
    })

// =-=-=-=-=-=-=-=-=-=-=-=- </generate-time> -=-=-=-=-=-=-=-=-=-=-=-=


// =-=-=-=-=-=-=-=-=-=-=-=- <clipboard> -=-=-=-=-=-=-=-=-=-=-=-=

    document.querySelectorAll('.copy-btn').forEach(copyBtn => {
        const clipboard = new ClipboardJS(copyBtn);
        clipboard.on('success', function (event) {
            const input = copyBtn.parentElement.querySelector('.copy-input');
            input.select();

            copyBtn.classList.remove('tooltip-active');

            setTimeout(() => {
                copyBtn.classList.add('tooltip-active');
            }, 0)

            /* const tooltip = document.createElement('div');
            tooltip.classList.add('copy-tooltip');
            tooltip.textContent = input.dataset.copiedText;
            tooltip.style.setProperty('--x', getCoords(copyBtn).left + 'px');
            tooltip.style.setProperty('--y', getCoords(copyBtn).top + 'px'); */

        })
    })

// =-=-=-=-=-=-=-=-=-=-=-=- </clipboard> -=-=-=-=-=-=-=-=-=-=-=-=


// =-=-=-=-=-=-=-=-=-=-=-=- <aside-nav-hover> -=-=-=-=-=-=-=-=-=-=-=-=

    document.querySelectorAll('.aside__nav > ul > li > a, .aside__nav > ul > li > button').forEach(target => {

        target.addEventListener('pointerenter', function (event) {
            if (getDeviceType() == "desktop" && !target.classList.contains('is-removing') && target.closest('.aside.is-min')) {

                const tooltip = document.createElement('div');
                tooltip.classList.add('aside-nav-tooltip');
                tooltip.style.setProperty('--x', getCoords(target).left + target.offsetWidth + 'px');
                tooltip.style.setProperty('--y', getCoords(target).top + target.offsetHeight / 2 + 'px');
                body.append(tooltip);

                tooltip.textContent = target.getAttribute('aria-label');

                setTimeout(() => {
                    tooltip.classList.add('is-visible');
                }, 0)
            }
        })

        target.addEventListener('pointerleave', function (event) {
            const asideNavTooltip = document.querySelectorAll('.aside-nav-tooltip');
            asideNavTooltip.forEach(tooltip => {
                tooltip.classList.remove('is-visible');
                target.classList.add('is-removing');
                setTimeout(() => {
                    tooltip.remove();
                    target.classList.remove('is-removing');
                }, 200)
            })
        })

    })

// =-=-=-=-=-=-=-=-=-=-=-=- </aside-nav-hover> -=-=-=-=-=-=-=-=-=-=-=-=


    document.querySelectorAll('.deadline-message').forEach(message => {
        const currentDate = new Date(), newDate = new Date();

        if (!localStorage.getItem('ic11-deadline')) {
            localStorage.setItem('ic11-deadline', currentDate.getMonth())
        }

        if (localStorage.getItem('ic11-deadline') == currentDate.getMonth()) {

            const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
            const daysLeft = lastDay.getDate() - currentDate.getDate();

            if (daysLeft <= 5) {

                message.style.removeProperty('display');

            }
        }
    })

    function validatePhoneNumber(input_str) {
        var re = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;

        return re.test(input_str);
    }

    function validateEmail(email) {
        let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        return reg.test(email);
    }

    document.querySelectorAll('form').forEach(form => {

        const emailInputs = form.querySelectorAll('input[type="email"]'),
            telInputs = form.querySelectorAll('input[type="tel"]');

        emailInputs.forEach(input => {
            input.addEventListener('blur', function (event) {
                if (!validateEmail(input.value)) input.classList.add('is-error'); else input.classList.remove('is-error');
            })
        })

        telInputs.forEach(input => {

            let telCode = input.closest('.tel-parent');
            if (telCode) {
                telCode = telCode.querySelector('.tel-code');
            } else {
                telCode = false;
            }

            if (telCode) {
                input.addEventListener('blur', function (event) {
                    if (!validatePhoneNumber(telCode.value + input.value)) input.classList.add('is-error'); else input.classList.remove('is-error');
                })

                telCode.addEventListener('change', function (event) {
                    if (!validatePhoneNumber(telCode.value + input.value)) input.classList.add('is-error'); else input.classList.remove('is-error');
                })
            } else {
                input.addEventListener('blur', function (event) {
                    if (!validatePhoneNumber(input.value)) input.classList.add('is-error'); else input.classList.remove('is-error');
                })
            }

        })

        form.addEventListener('submit', function (event) {
            if (document.querySelector('.is-error')) event.preventDefault();
        })
    })

// =-=-=-=-=-=-=-=-=-=-=-=- <popup> -=-=-=-=-=-=-=-=-=-=-=-=

    function Popup(arg) {

        let body = document.querySelector('body'),
            html = document.querySelector('html'),
            saveID = (typeof arg == 'object') ? (arg['saveID']) ? true : false : false,
            popupCheck = true,
            popupCheckClose = true;

        const removeHash = function () {
            let uri = window.location.toString();
            if (uri.indexOf("#") > 0) {
                let clean_uri = uri.substring(0, uri.indexOf("#"));
                window.history.replaceState({}, document.title, clean_uri);
            }
        }

        const open = function (id, initStart) {

            if (popupCheck) {
                popupCheck = false;

                let popup = document.querySelector(id);

                if (popup) {

                    if (popup.classList.contains('popup')) {

                        if (document.querySelector(`[href="${id}"]`)) {
                            document.querySelector(`[href="${id}"]`).classList.add('is-active-popup');
                        }

                        popup.style.display = 'flex';

                        body.classList.remove('is-popup-active');
                        html.style.setProperty('--popup-padding', window.innerWidth - body.offsetWidth + 'px');
                        body.classList.add('is-popup-active');

                        // eslint-disable-next-line no-restricted-globals
                        if (saveID && !popup.classList.contains('is-sub')) history.pushState('', "", id);

                        setTimeout(() => {
                            if (!initStart) {
                                popup.classList.add('is-active');
                                setTimeout(() => {
                                    popupCheck = true;
                                }, 300)
                            } else {
                                popup.classList.add('is-transition-none');
                                popup.classList.add('is-active');
                                popupCheck = true;
                            }

                        }, 0)
                    }

                } else {
                    return new Error(`Not found "${id}"`)
                }
            }
        }

        const close = function (popupClose) {

            if (popupCheckClose) {
                popupCheckClose = false;

                let popup
                if (typeof popupClose === 'string') {
                    popup = document.querySelector(popupClose)
                } else {
                    popup = popupClose.closest('.popup');
                }

                if (popup.classList.contains('is-transition-none')) popup.classList.remove('is-transition-none')

                setTimeout(() => {

                    popup.classList.remove('is-active');
                    if (document.querySelector(`.is-active-popup[href="#${popup.getAttribute('id')}"]`)) {
                        document.querySelector(`.is-active-popup[href="#${popup.getAttribute('id')}"]`).classList.remove('is-active-popup');
                    }

                    function closeFunc() {
                        const activePopups = document.querySelectorAll('.popup.is-active');

                        if (activePopups.length < 1) {
                            body.classList.remove('is-popup-active');
                            html.style.setProperty('--popup-padding', '0px');
                        }

                        if (saveID && !popup.classList.contains('is-sub')) {
                            removeHash();
                            if (activePopups[activePopups.length - 1]) {
                                // eslint-disable-next-line no-restricted-globals
                                history.pushState('', "", "#" + activePopups[activePopups.length - 1].getAttribute('id'));
                            }
                        }

                        popupCheckClose = true;
                        popup.style.display = 'none';
                    }

                    setTimeout(() => {
                        closeFunc();
                    }, 300)

                }, 0)

            }

        }

        return {

            open: function (id) {
                open(id);
            },

            close: function (popupClose) {
                close(popupClose)
            },

            init: function () {

                let thisTarget
                body.addEventListener('click', function (event) {

                    thisTarget = event.target;

                    let popupOpen = thisTarget.closest('.open-popup');
                    if (popupOpen) {
                        event.preventDefault();
                        open(popupOpen.getAttribute('href'))
                    }

                    let popupClose = thisTarget.closest('.popup-close');
                    if (popupClose) {
                        close(popupClose)
                    }

                });

                body.addEventListener('keyup', function (event) {

                    if (event.code == 27 && document.querySelector('.popup.is-active')) {
                        close(document.querySelector('.popup.is-active'));
                    }

                });

                if (saveID) {
                    let url = new URL(window.location);
                    if (url.hash) {
                        open(url.hash, true);
                    }
                }
            },

        }
    }

    const popup = new Popup({
        saveID: true, // false
    });

    popup.init()

// =-=-=-=-=-=-=-=-=-=-=-=- </popup> -=-=-=-=-=-=-=-=-=-=-=-=


    window.addEventListener('load', function (event) {
        body.classList.add('is-init')

        main.querySelector('.simplebar-content-wrapper').scrollTop = 0;

        if (document.querySelector('.down-sidebar__chat-block')) {
            document.querySelector('.down-sidebar__chat-block .simplebar-content-wrapper').scrollTop = document.querySelector('.down-sidebar__chat-block .simplebar-content-wrapper').scrollHeight;
        }
    })

}, 1000)