import React from 'react'
import {useEffect,useRef} from 'react'

export default function Comminuty() {

    // meth-1
    // <div className="involveme_embed" data-project="test" data-embed-mode="fullscreen" data-noresize="true"><iframe src="https://nitin3.involve.me/embed"/></div>
    // meth-2
    // const divRef = useRef();

    // const htmlString = `
    //     <script src="https://cdnjs.cloudflare.com/ajax/libs/react/18.0.0/umd/react.production.min.js"></script>
    //     <script>alert('Hello React!');</script>
    // `;

    // useEffect(() => {
    //     const fragment = document.createRange().createContextualFragment(htmlString);
    //     divRef.current.append(fragment);
    // }, []);

    // return <div ref={divRef} />;

    // meth-3
    // return <div dangerouslySetInnerHTML={{ __html: "<iframe src='https://nitin3.involve.me/embed' />"}} />;

    // meth-4
    // <div class="involveme_embed" data-project="test"><script src="https://nitin3.involve.me/embed"></script></div>

    useEffect(() => {
        const script = document.createElement('script');
      
        // script.src = "https://nitin3.involve.me/embed";
        script.src = "https://choira.involve.me/embed"
        script.async = true;
      
        document.body.appendChild(script);
      
        return () => {
          document.body.removeChild(script);
        }
      }, []);

      return <div class="involveme_embed" data-project="mp-onboarding-e67d52779ca3"></div>
}
