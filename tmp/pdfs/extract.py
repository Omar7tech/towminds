from pypdf import PdfReader, PdfWriter
from pypdf.generic import ContentStream
from pathlib import Path
from io import BytesIO


source = 'C:/Users/Omar/Downloads/Mobile Devices/Two Minds HomePage Ui .pdf'
out = Path('public/design')
out.mkdir(parents=True, exist_ok=True)
reader = PdfReader(source)
page = reader.pages[0]
ops = page.get_contents().operations
writer = PdfWriter()
writer.add_page(page)
stream = ContentStream(None, writer)
stream.operations = ops[:21] + ops[29661:29672] + [([], b'EMC')]
writer.pages[0].replace_contents(stream)
with open('tmp/pdfs/background.pdf', 'wb') as f:
    writer.write(f)

# Preserve the original vector card art, without flattening the page's live text.
writer = PdfWriter()
writer.add_page(page)
stream = ContentStream(None, writer)
stream.operations = [(a, op) for a, op in ops if op not in (b'Tj', b'TJ')]
writer.pages[0].replace_contents(stream)
with open('tmp/pdfs/artwork.pdf', 'wb') as f:
    writer.write(f)

for name in ('/TT0', '/TT1', '/TT2'):
    font = page['/Resources']['/Font'][name].get_object()
    data = font['/FontDescriptor']['/FontFile2'].get_data()
    (out / (name[1:] + '.ttf')).write_bytes(data)

