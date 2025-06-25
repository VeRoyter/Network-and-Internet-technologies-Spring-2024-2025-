// src/components/Gallery.tsx

import { Box, Container, ImageList, ImageListItem, ImageListItemBar } from '@mui/material';
import { headerImages } from '../headerimg';

export default function Gallery() {
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
                    {headerImages.map((img) => (
                        <ImageListItem key={img.src}>
                            <img
                                src={img.src}
                                alt={img.alt}
                                loading="lazy"
                                style={{
                                    width: '100%',
                                    display: 'block',
                                    borderRadius: '4px',
                                }}
                            />
                            <ImageListItemBar 
                                title={img.alt}
                                position="bottom"
                                sx={{
                                    borderBottomLeftRadius: '4px',
                                    borderBottomRightRadius: '4px',
                                }}
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
            </Box>
        </Container>
    );
}