import React from 'react'
import '../Assets/Styles/sidebar-menu.css'

const Sidebar = () => {

    React.useEffect(() => {
        var toggle = true;
        var pageContainer = document.querySelector(".page-container");
        var sidebarIcon = document.querySelector(".sidebar-icon");
        var menuSpan = document.querySelector("#menu span");

        pageContainer.classList.add("sidebar-collapsed");

        sidebarIcon.addEventListener("click", function () {
            if (toggle) {
                pageContainer.classList.add("sidebar-collapsed");
                pageContainer.classList.remove("sidebar-collapsed-back");
                menuSpan.style.position = "absolute";
            } else {
                pageContainer.classList.remove("sidebar-collapsed");
                pageContainer.classList.add("sidebar-collapsed-back");
                setTimeout(function () {
                    menuSpan.style.position = "relative";
                }, 400);
            }
            toggle = !toggle;
        });
    }, [])

    return (
        <div className="sidebar-menu">
            <div className="logo">
                <a href="#" className="sidebar-icon"> <span className="fa fa-bars"></span> </a>
            </div>
            <div className="menu">
                <ul id="menu">
                    <li id="menu-home"><a href="#"><i className="fa-solid fa-comments"></i><span>Counseling</span></a></li>
                    <li><a href="#"><i className="fa fa-share-alt"></i><span>Coaching</span></a></li>
                    <li id="menu-comunicacao"><a href="#"><i className="fa fa-anchor"></i><span>Application</span></a></li>
                    <li id="menu-academico"><a href="#"><i className="fa fa-envelope"></i><span>Financial</span></a></li>
                    <li><a href="#"><i className="fa fa-history"></i><span>Pre-Departure</span></a></li>
                    <li><a href="#"><i className="fa fa-gears"></i><span>Post-Departure</span></a></li>
                </ul>
            </div>
        </div>
    )
}

export default Sidebar
