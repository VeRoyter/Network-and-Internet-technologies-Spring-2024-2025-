import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import {Link} from 'react-router-dom';


// import { headerImages } from '../src/images';


import structures from "../../data";
const imgData=structures.slice(0, -1);

// function Gallery() {
//     return (
//         <Container maxWidth="lg" sx={{ pt: 4, pb: 2 }}>
//                 <Box sx={{ 
//                     height: 585, 
//                     overflowY: 'auto',
//                     overflowX: 'hidden',
//                     margin: '20px auto',
//                     borderRadius: '8px',
//                 }}>
//                     <ImageList
//                         variant="masonry"
//                         cols={1}
//                         gap={8}
//                         sx={{
//                             width: '100%',
//                             margin: 0,
//                             padding: 1,
//                         }}
//                     >
//                         {imgData.map((item,index) => (
//                             <Link key={ index } to={ "/building/" + index }>
//                             <ImageListItem key={ item.img }>
//                                 <img
//                                     src={ item.img }
//                                     alt={ item.title }
//                                     loading="lazy"
//                                     style={{
//                                         width: '100%',
//                                         display: 'block',
//                                         borderRadius: '4px',
//                                     }}
//                                 />
//                                 <ImageListItemBar 
//                                     title={img.alt}
//                                     position="bottom"
//                                     sx={{
//                                         borderBottomLeftRadius: '4px',
//                                         borderBottomRightRadius: '4px',
//                                     }}
//                                 />
//                             </ImageListItem>
//                         ))}
//                     </ImageList>
//                 </Box>
//             </Container>
//  );
// }
// export default Gallery;


function Gallery() {
    return (
<Container maxWidth="lg" sx={{ pt: 4, pb: 2 }}>
    <Box sx={{ 
        height: 585, 
                overflowY: 'auto',
                overflowX: 'hidden',
                margin: '20px auto',
                borderRadius: '8px',
    }}>
        <ImageList
            variant="masonry"
                    cols={1}
                    gap={8}
                    sx={{
                        width: '100%',
                        margin: 0,
                        padding: 1,
                    }}
            >
            {imgData.map((item,index) => (
            <Link key={ index } to={ "/building/" + index }>

            <ImageListItem key={ item.img }>
            {/* <img
                srcSet={ item.img }
                src={ item.img }
                alt={ item.title }
                loading="lazy"
            /> */}
            <img
                            src={ item.img }
                            alt={ item.title }
                            loading="lazy"
                            style={{
                                width: '100%',
                                display: 'block',
                                borderRadius: '4px',
                            }}
            />
            <ImageListItemBar 
                                title={item.title}
                                position="bottom"
                                sx={{
                                    borderBottomLeftRadius: '4px',
                                    borderBottomRightRadius: '4px',
                                }}
                            />
            </ImageListItem>
            </Link>
            ))}
        </ImageList>`
    </Box>
</Container> 
 );
}
export default Gallery;


// function Gallery() {
//     return (
// <Container maxWidth="lg">
//     <Box sx={{ height: 585, overflowY: 'scroll', m: '20px auto'}}>
//         <ImageList variant="masonry" sx={{
//             columnCount: {
//             xs: '1 !important',
//             sm: '2 !important',
//             md: '3 !important',
//             lg: '4 !important',
//             },
//             }}
//             gap={8}>
//             {imgData.map((item,index) => (
//             <Link key={ index } to={ "/building/" + index }>

//             <ImageListItem key={ item.img }>
//             <img
//                 srcSet={ item.img }
//                 src={ item.img }
//                 alt={ item.title }
//                 loading="lazy"
//             />
//             <ImageListItemBar position="bottom" title={ item.title } />

//             </ImageListItem>
//             </Link>
//             ))}
//         </ImageList>`
//     </Box>
// </Container> 
//  );
// }
// export default Gallery;