#!/usr/bin/env python3
"""
Broadsage Brand Kit Presentation Deck Generator
Builds the official 23-slide widescreen agency brand kit PDF.
"""
import os, subprocess, sys

REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SLIDES_DIR = os.path.join(REPO_ROOT, 'deck')
OUTPUT_PDF = os.path.join(REPO_ROOT, 'broadsage_brand_kit.pdf')

def build_single_page_pdf(stream_bytes):
    out = bytearray()
    offsets = [0]
    out.extend(b'%PDF-1.4\n')
    offsets.append(len(out))
    out.extend(b'1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n')
    offsets.append(len(out))
    out.extend(b'2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n')
    offsets.append(len(out))
    out.extend(b'3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 842 595] /Contents 4 0 R \n'
               b'            /Resources << /Font << /FB 5 0 R /FR 6 0 R /FM 7 0 R >> >> >>\n'
               b'endobj\n')
    offsets.append(len(out))
    s_obj = f'4 0 obj\n<< /Length {len(stream_bytes)} >>\nstream\n'.encode('latin1') + stream_bytes + b'\nendstream\nendobj\n'
    out.extend(s_obj)
    offsets.append(len(out))
    out.extend(b'5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>\nendobj\n')
    offsets.append(len(out))
    out.extend(b'6 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n')
    offsets.append(len(out))
    out.extend(b'7 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Courier >>\nendobj\n')
    
    xref_offset = len(out)
    out.extend(b'xref\n0 8\n0000000000 65535 f \n')
    for off in offsets[1:]:
        out.extend(f'{off:010d} 00000 n \n'.encode('latin1'))
    out.extend(f'trailer\n<< /Size 8 /Root 1 0 R >>\nstartxref\n{xref_offset}\n%%EOF\n'.encode('latin1'))
    return bytes(out)

def build_multi_page_pdf(streams):
    out = bytearray()
    offsets = [0]
    out.extend(b'%PDF-1.4\n')
    
    # 1 0 obj Catalog
    offsets.append(len(out))
    out.extend(b'1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n')
    
    # 2 0 obj Pages
    offsets.append(len(out))
    kids = ' '.join(f'{i} 0 R' for i in range(3, 26))
    out.extend(f'2 0 obj\n<< /Type /Pages /Kids [{kids}] /Count 23 >>\nendobj\n'.encode('latin1'))
    
    # 3..25 Page objects
    for i in range(1, 24):
        offsets.append(len(out))
        page_num = 2 + i
        contents_num = 25 + i
        p_obj = (f'{page_num} 0 obj\n'
                 f'<< /Type /Page /Parent 2 0 R /MediaBox [0 0 842 595] /Contents {contents_num} 0 R \n'
                 f'            /Resources << /Font << /FB 49 0 R /FR 50 0 R /FM 51 0 R >> >> >>\n'
                 f'endobj\n')
        out.extend(p_obj.encode('latin1'))
        
    # 26..48 Stream objects
    for i in range(1, 24):
        offsets.append(len(out))
        stream_bytes = streams[i-1]
        c_num = 25 + i
        s_obj = (f'{c_num} 0 obj\n'
                 f'<< /Length {len(stream_bytes)} >>\n'
                 f'stream\n').encode('latin1') + stream_bytes + b'\nendstream\nendobj\n'
        out.extend(s_obj)
        
    # 49, 50, 51 Fonts
    offsets.append(len(out))
    out.extend(b'49 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>\nendobj\n')
    offsets.append(len(out))
    out.extend(b'50 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n')
    offsets.append(len(out))
    out.extend(b'51 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Courier >>\nendobj\n')
    
    xref_offset = len(out)
    out.extend(b'xref\n0 52\n0000000000 65535 f \n')
    for off in offsets[1:]:
        out.extend(f'{off:010d} 00000 n \n'.encode('latin1'))
        
    out.extend(f'trailer\n<< /Size 52 /Root 1 0 R >>\nstartxref\n{xref_offset}\n%%EOF\n'.encode('latin1'))
    return bytes(out)

def get_stream(slide_num):
    filepath = os.path.join(SLIDES_DIR, f'slide_{slide_num:02d}.pdf')
    with open(filepath, 'rb') as f:
        data = f.read()
    s_start = data.find(b'stream\n') + 7
    s_end = data.find(b'\nendstream')
    return data[s_start:s_end]

def build():
    streams = []
    for i in range(1, 24):
        streams.append(get_stream(i))
    pdf_bytes = build_multi_page_pdf(streams)
    with open(OUTPUT_PDF, 'wb') as f:
        f.write(pdf_bytes)
    print(f'Successfully built {OUTPUT_PDF} ({len(pdf_bytes)} bytes)')

if __name__ == '__main__':
    build()

